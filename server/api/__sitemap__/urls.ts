import { albums, artists, db } from "~/server/db";

export default defineSitemapEventHandler(async () => {
  const artistsIds = await db.select({ id: artists.id }).from(artists);
  const albumsIds = await db.select({ id: albums.id }).from(albums);

  return [
    ...artistsIds.map(({ id }) => asSitemapUrl(`/artists/${id}`)),
    ...albumsIds.map(({ id }) => asSitemapUrl(`/albums/${id}`)),
  ];
});
