import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import type { SQLiteSelect, SQLiteTable } from "drizzle-orm/sqlite-core";

import { sql, eq, count } from "drizzle-orm";
import { albums, albumsArtists, artists, db, songs } from ".";

function parseJson<T>(value: string) {
  return JSON.parse(value) as T;
}

export const queryAlbums = (db: BetterSQLite3Database) =>
  db
    .select({
      id: albums.id,
      name: albums.name,
      thumbnail: albums.thumbnail,

      artists: sql`json_group_array(DISTINCT json_object(
        'id', "artists"."id",
        'name', "artists"."name",
        'thumbnail', "artists"."thumbnail"
      ))`
        .mapWith({
          mapFromDriverValue: parseJson<typeof artists.$inferSelect>,
        })
        .as("artists"),
      songs: sql`json_group_array(DISTINCT json_object(
        'id', "songs"."id",
        'name', "songs"."name",
        'albumId', "songs"."album_id",
        'youtubeId', "songs"."youtube_id"
      ))`
        .mapWith({
          mapFromDriverValue(value: string) {
            return parseJson<(typeof songs.$inferSelect)[]>(value).filter(
              (s) => s.id !== null
            );
          },
        })
        .as("songs"),
    })
    .from(albums)
    .innerJoin(albumsArtists, eq(albumsArtists.albumId, albums.id))
    .innerJoin(artists, eq(artists.id, albumsArtists.artistId))
    .leftJoin(songs, eq(songs.albumId, albums.id))
    .groupBy(albums.id);

export const queryArtists = (db: BetterSQLite3Database) =>
  db
    .select({
      id: artists.id,
      name: artists.name,
      thumbnail: artists.thumbnail,
      albums: sql`json_group_array(DISTINCT json_object(
        'id', "albums"."id",
        'name', "albums"."name",
        'thumbnail', "albums"."thumbnail"
      ))`
        .mapWith({
          mapFromDriverValue(value: string) {
            return parseJson<(typeof albums.$inferSelect)[]>(value).filter(
              (a) => a.id !== null
            );
          },
        })
        .as("albums"),
    })
    .from(artists)
    .leftJoin(albumsArtists, eq(albumsArtists.artistId, artists.id))
    .leftJoin(albums, eq(albums.id, albumsArtists.albumId))
    .groupBy(artists.id);

export const querySongs = (db: BetterSQLite3Database) =>
  db
    .select({
      id: songs.id,
      name: songs.name,
      youtubeId: songs.youtubeId,

      album: sql`json_object(
        'id', "albums"."id",
        'name', "albums"."name",
        'thumbnail', "albums"."thumbnail"
      )`
        .mapWith(parseJson<typeof albums.$inferSelect>)
        .as("album"),

      artists: sql`json_group_array(DISTINCT json_object(
        'id', "artists"."id", 
        'name', "artists"."name",
        'thumbnail', "artists"."thumbnail"
      ))`
        .mapWith(parseJson<(typeof artists.$inferSelect)[]>)
        .as("artists"),
    })
    .from(songs)
    .innerJoin(albums, eq(albums.id, songs.albumId))
    .innerJoin(albumsArtists, eq(albumsArtists.albumId, albums.id))
    .innerJoin(artists, eq(artists.id, albumsArtists.artistId))
    .groupBy(songs.id);

export async function paginate<
  Query extends SQLiteSelect,
  Table extends SQLiteTable
>(q: Query, table: Table, page: number = 1, perPage = 20) {
  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  let nextPage = page + 1;
  const offset = page - 1;

  const data = await q.limit(perPage).offset(offset * perPage);
  const [{ total }] = await db.select({ total: count() }).from(table);

  const lastPage = Math.floor(total / perPage) + 1;

  return {
    meta: { lastPage, nextPage, page, perPage, total },
    data,
  };
}
