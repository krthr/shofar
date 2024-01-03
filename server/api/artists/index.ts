import { asc } from "drizzle-orm";
import type { H3Event } from "h3";

import { artists, db } from "~/server/db";
import { getPagination } from "~/server/utils/pagination";

async function getArtists(event: H3Event) {
  const pagination = getPagination(event, 100);
  const { meta, offset, limit } = pagination;

  const data = await db.query.artists.findMany({
    columns: {
      id: true,
      name: true,
      thumbnail: true,
    },
    with: {
      albums: {
        columns: { albumId: false, artistId: false, id: false },
        with: { album: { columns: { id: true, name: true, thumbnail: true } } },
      },
    },
    orderBy: asc(artists.name),
    offset,
    limit,
  });

  return { data, meta };
}

export type GetArtists = Awaited<ReturnType<typeof getArtists>>;

export default defineEventHandler(getArtists);
