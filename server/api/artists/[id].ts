import type { H3Event } from "h3";

import { eq } from "drizzle-orm";
import { artists, db } from "~/server/db";
import { getNumericParam } from "~/server/utils/params";

async function getArtist(event: H3Event) {
  const id = getNumericParam(event, "id")!;

  const artist = await db.query.artists.findFirst({
    where: eq(artists.id, id),
    columns: {
      id: true,
      name: true,
      thumbnail: true,
    },
    with: {
      albums: {
        columns: { id: false, albumId: false, artistId: false },
        with: { album: { columns: { id: true, name: true, thumbnail: true } } },
      },
    },
  });

  return artist;
}

export type GetArtist = Awaited<ReturnType<typeof getArtist>>;

export default defineEventHandler(getArtist);
