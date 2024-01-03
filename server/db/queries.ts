import { eq, sql } from "drizzle-orm";
import { albums, albumsArtists, artists, songs } from ".";

export const querySongs = (db: typeof import(".").db) =>
  db
    .select({
      id: songs.id,
      name: songs.name,
      youtubeId: songs.youtubeId,
      album: sql`json_object(
        'id', ${albums.id},
        'name', ${albums.name},
        'thumbnail', ${albums.thumbnail},
        'releaseYear', ${albums.releaseYear}
      )`.mapWith(
        (value: string) => JSON.parse(value) as typeof albums.$inferSelect
      ),
      artists: sql`json_group_array( DISTINCT
        json_object(
          'id', ${artists.id},
          'name', ${artists.name},
          'thumbnail', ${artists.thumbnail}
        )
      )`.mapWith(
        (value: string) => JSON.parse(value) as (typeof artists.$inferSelect)[]
      ),
    })
    .from(songs)
    .innerJoin(albumsArtists, eq(albumsArtists.albumId, songs.albumId))
    .innerJoin(albums, eq(albumsArtists.albumId, albums.id))
    .innerJoin(artists, eq(albumsArtists.artistId, artists.id))
    .groupBy(songs.id)
    .orderBy(sql`random()`);
