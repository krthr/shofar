import type { H3Event } from "h3";

import { asc, count, desc, eq, sql } from "drizzle-orm";
import { albums, albumsArtists, artists, db } from "~/server/db";
import { getNumericParam } from "~/server/utils/params";

async function getArtist(event: H3Event) {
  const id = getNumericParam(event, "id")!;

  const [artist] = await db
    .select({
      id: artists.id,
      name: artists.name,
      thumbnail: artists.thumbnail,
      albums: sql`json_group_array(
        DISTINCT json_object(
          'id', ${albums.id},
          'name', ${albums.name},
          'thumbnail', ${albums.thumbnail},
          'releaseYear', ${albums.releaseYear}
        )
       )`.mapWith((value: string) =>
        (JSON.parse(value) as (typeof albums.$inferSelect)[]).sort((a, b) => {
          if (a.releaseYear === null && b.releaseYear === null) return 0;
          if (a.releaseYear === null) return 1;
          if (b.releaseYear === null) return -1;
          return b.releaseYear - a.releaseYear;
        })
      ),
    })
    .from(artists)
    .innerJoin(albumsArtists, eq(albumsArtists.artistId, id))
    .innerJoin(albums, eq(albums.id, albumsArtists.albumId))
    .where(eq(artists.id, id))
    .groupBy(artists.id);

  return artist;
}

export type GetArtist = Awaited<ReturnType<typeof getArtist>>;

export default defineEventHandler(getArtist);
