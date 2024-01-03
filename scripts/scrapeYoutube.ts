import "dotenv/config";

import DATA from "./data";
import Sharp from "sharp";

import { albums, albumsArtists, artists, db, songs } from "../server/db/index";
import { and, eq } from "drizzle-orm";
import { youtube } from "../server/services/youtube";

async function downloadAndParseImage(url?: string | null) {
  if (!url) {
    return null;
  }

  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return (
    "data:image/jpeg;base64," +
    (await Sharp(buffer).jpeg().resize(500, null).toBuffer()).toString("base64")
  );
}

async function getChannelInfo(id: string) {
  const response = await youtube.channels.list({
    id: [id],
    part: "snippet",
  } as any);

  return response.data.items?.at(0)?.snippet;
}

async function getPlaylistInfo(id: string) {
  const response = await youtube.playlists.list({
    id,
    part: "snippet",
  } as any);

  return response.data.items
    ?.map((playlist) => ({
      ...playlist.snippet,
      id: playlist.id!,
    }))
    .at(0);
}

async function getPlaylistVideos(id: string) {
  const response = await youtube.playlistItems.list({
    playlistId: id,
    part: "snippet",
    maxResults: 100,
  } as any);

  return response.data.items?.map((item) => ({ ...item.snippet, id }));
}

async function seedDatabase() {
  for (const rawArtist of DATA) {
    console.log(`Getting channel info. channelId=${rawArtist.channelId}`);

    let [artist] = await db
      .select()
      .from(artists)
      .where(eq(artists.name, rawArtist.name))
      .limit(1);

    if (!artist) {
      const channelInfo = await getChannelInfo(rawArtist.channelId);

      const thumbnailUrl = channelInfo?.thumbnails?.high?.url
        ? channelInfo?.thumbnails?.high?.url
        : channelInfo?.thumbnails?.default?.url;

      artist = await db
        .insert(artists)
        .values({
          name: rawArtist.name,
          thumbnail: await downloadAndParseImage(thumbnailUrl),
        })
        .returning()
        .then((r) => r.at(0)!);

      console.log(`Artist created. id=${artist.id} name=${artist.name}`);
    } else {
      console.log(`Artist already exists. id=${artist.id} name=${artist.name}`);
    }

    console.log("Getting albums");

    for (const rawAlbum of rawArtist.albums) {
      let [albumArtist] = await db
        .select()
        .from(albumsArtists)
        .where(and(eq(albumsArtists.artistId, artist.id)))
        .innerJoin(albums, eq(albums.name, rawAlbum.name))
        .limit(1);

      let album: typeof albums.$inferSelect;

      if (!albumArtist) {
        console.log(`Getting playlist info. playlistId=${rawAlbum.playlistId}`);
        const channelPlaylist = await getPlaylistInfo(rawAlbum.playlistId);

        if (!channelPlaylist) {
          continue;
        }

        console.log(`Creating album. name=${rawAlbum.name}`);

        console.log(channelPlaylist.thumbnails);

        const thumbnailUrl = channelPlaylist.thumbnails?.maxres?.url
          ? channelPlaylist.thumbnails?.maxres?.url
          : channelPlaylist.thumbnails?.standard?.url;

        album = await db
          .insert(albums)
          .values({
            name: rawAlbum.name,
            thumbnail: await downloadAndParseImage(thumbnailUrl),
          })
          .returning()
          .then((r) => r.at(0)!);

        console.log(
          `Creating album-artist. albumId=${album.id} artistId=${artist.id}`
        );

        await db.insert(albumsArtists).values({
          albumId: album.id,
          artistId: artist.id,
        });
      } else {
        album = albumArtist.albums;
        console.log(`Album already exists. id=${albumArtist.albums.id}`);
      }

      const playlistVideos = await getPlaylistVideos(rawAlbum.playlistId);
      if (typeof playlistVideos === "undefined") return;

      for (const playlistVideo of playlistVideos) {
        await db
          .insert(songs)
          .values({
            albumId: album.id,
            youtubeId: playlistVideo.resourceId!.videoId!,
            name: playlistVideo.title!,
          })
          .onConflictDoNothing();
      }
    }

    // for (const playlist of channelAlbums) {
    //   if (typeof playlist === "undefined") continue;

    //   const albumName = rawArtist.albums.find(
    //     (a) => a.playlistId === playlist.id
    //   )!.name;

    //   const [albumArtist] = await db
    //     .select()
    //     .from(albumsArtists)
    //     .where(and(eq(albumsArtists.artistId, artist.id)))
    //     .innerJoin(albums, eq(albums.name, albumName))
    //     .limit(1);

    //   console.log({ albumArtist });

    //   // const playlistVideos = await getPlaylistVideos(album.id);
    // }
  }
}

await seedDatabase();
