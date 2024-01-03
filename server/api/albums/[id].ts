import type { H3Event } from "h3";

import { eq } from "drizzle-orm";
import { albums, db } from "~/server/db";

async function getAlbum(event: H3Event) {
  const id = getNumericParam(event, "id");
  if (!id) return undefined;

  const album = await db.query.albums.findFirst({
    where: eq(albums.id, id),
    with: {
      artists: {
        columns: { albumId: false, artistId: false, id: false },
        with: {
          artist: { columns: { id: true, name: true } },
        },
      },
    },
  });

  return album;
}

export type GetAlbum = Awaited<ReturnType<typeof getAlbum>>;

export default defineEventHandler(getAlbum);
