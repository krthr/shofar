import { asc } from "drizzle-orm";
import type { H3Event } from "h3";

import { artists, db } from "~/server/db";
import { getPagination } from "~/server/utils/pagination";

async function getArtists(event: H3Event) {
  const pagination = getPagination(event, 100);
  const { meta, offset, limit } = pagination;

  const data = await db
    .select()
    .from(artists)
    .limit(limit)
    .offset(offset)
    .orderBy(asc(artists.name));

  return { data, meta };
}

export type GetArtists = Awaited<ReturnType<typeof getArtists>>;

export default defineEventHandler(getArtists);
