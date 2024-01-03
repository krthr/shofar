import type { H3Event } from "h3";

import { eq, sql } from "drizzle-orm";
import { albums, albumsArtists, artists, db } from "~/server/db";

async function getAlbum(event: H3Event) {
  const id = getNumericParam(event, "id");
  if (!id) return undefined;

  const [album] = await db
    .select({
      id: albums.id,
      name: albums.name,
      thumbnail: albums.thumbnail,
      artists: sql`json_group_array(
        DISTINCT json_object(
          'id', ${artists.id},
          'name', ${artists.name}
        )
      )`.mapWith(
        (value: string) => JSON.parse(value) as (typeof artists.$inferSelect)[]
      ),
    })
    .from(albums)
    .innerJoin(albumsArtists, eq(albumsArtists.albumId, id))
    .innerJoin(artists, eq(albumsArtists.artistId, artists.id))
    .where(eq(albums.id, id))
    .limit(1);

  return album;
}

export type GetAlbum = Awaited<ReturnType<typeof getAlbum>>;

export default defineEventHandler(getAlbum);
