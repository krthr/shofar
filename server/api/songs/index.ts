import { eq } from "drizzle-orm";
import type { H3Event } from "h3";
import { albums, artists, db, songs } from "~/server/db";
import { querySongs } from "~/server/db/queries";

async function getSongs(event: H3Event) {
  const limit = getNumericQuery(event, "limit");
  const query = querySongs(db);

  const songId = getNumericQuery(event, "songId");
  if (typeof songId !== "undefined") {
    const data = await query.where(eq(songs.id, songId)).limit(1);

    return { data };
  }

  const albumId = getNumericQuery(event, "albumId");
  if (typeof albumId !== "undefined") {
    const data = await query.where(eq(albums.id, albumId)).limit(limit ?? 50);

    return { data };
  }

  const artistId = getNumericQuery(event, "artistId");
  if (typeof artistId !== "undefined") {
    const data = await query.where(eq(artists.id, artistId)).limit(limit ?? 50);

    return { data };
  }

  return { data: [] };
}

export type GetSongs = Awaited<ReturnType<typeof getSongs>>;

export default defineEventHandler(getSongs);
