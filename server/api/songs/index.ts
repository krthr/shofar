import { eq, sql, inArray } from "drizzle-orm";
import type { H3Event } from "h3";
import { albumsArtists, db, songs } from "~/server/db";

async function getSongs(event: H3Event) {
  const limit = getNumericQuery(event, "limit");

  const songId = getNumericQuery(event, "songId");
  if (typeof songId !== "undefined") {
    const data = await db.query.songs.findMany({
      where: eq(songs.id, songId),
      with: {
        album: { with: { artists: { with: { artist: true } } } },
      },
      limit: 1,
    });

    return { data };
  }

  const albumId = getNumericQuery(event, "albumId");
  if (typeof albumId !== "undefined") {
    const data = await db.query.songs.findMany({
      where: eq(songs.albumId, albumId),
      with: {
        album: { with: { artists: { with: { artist: true } } } },
      },
      limit: limit ?? 100,
      orderBy: sql`random()`,
    });

    return { data };
  }

  const artistId = getNumericQuery(event, "artistId");
  if (typeof artistId !== "undefined") {
    const albumsIds = await db
      .select({ id: albumsArtists.albumId })
      .from(albumsArtists)
      .where(eq(albumsArtists.artistId, artistId));

    const data = await db.query.songs.findMany({
      where: inArray(
        songs.albumId,
        albumsIds.map((i) => i.id)
      ),
      limit: limit ?? 50,
      with: {
        album: { with: { artists: { with: { artist: true } } } },
      },
      orderBy: sql`random()`,
    });

    return { data };
  }

  return { data: [] };
}

export type GetSongs = Awaited<ReturnType<typeof getSongs>>;

export default defineEventHandler(getSongs);
