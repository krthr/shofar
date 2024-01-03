import type { H3Event } from "h3";

import { db } from "../db";
import { sql } from "drizzle-orm";
// import { db, queryAlbums, queryArtists, querySongs } from "../db";
// import { sql } from "drizzle-orm";

async function search(event: H3Event) {
  const { search } = getQuery(event);

  if (typeof search !== "string" || search.trim().length === 0) {
    return { artists: [], albums: [], songs: [] };
  }

  const [artists, albums, songs] = await Promise.allSettled([
    db.query.artists.findMany({
      where: sql.raw(`"artists"."name" LIKE '%${search}%' COLLATE NOCASE`),
      limit: 4,
    }),

    db.query.albums.findMany({
      where: sql.raw(`"albums"."name" LIKE '%${search}%' COLLATE NOCASE`),
      with: {
        artists: {
          columns: { albumId: false, artistId: false },
          with: { artist: true },
        },
      },
      limit: 8,
    }),

    db.query.songs.findMany({
      where: sql.raw(`"songs"."name" LIKE '%${search}%' COLLATE NOCASE`),
      with: {
        album: {
          columns: { id: true, name: true, thumbnail: true },
          with: {
            artists: {
              columns: { albumId: false, artistId: false },
              with: { artist: true },
            },
          },
        },
      },
      limit: 8,
      orderBy: sql`random()`,
    }),
  ]);

  return {
    artists: artists.status === "fulfilled" ? artists.value : [],
    albums: albums.status === "fulfilled" ? albums.value : [],
    songs: songs.status === "fulfilled" ? songs.value : [],
  };
}

export type Search = Awaited<ReturnType<typeof search>>;

export default defineEventHandler(search);
