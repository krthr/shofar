import type { GetSongs } from "~/server/api/songs";

type Song = GetSongs["data"][number];

interface GetSongsArgs {
  songId?: number;
  albumId?: number;
  artistId?: number;
  limit?: number;
}

async function getSongs(filters: GetSongsArgs = {}) {
  try {
    const { data } = await $fetch("/api/songs", { query: { ...filters } });
    return data;
  } catch (error) {
    return [];
  }
}

export default defineNuxtPlugin(() => {
  const loading = ref(false);
  const playlist = ref<Song[]>([]);
  const playing = ref<Song | undefined>();

  function addSongsToPlaylist(songs: Song[]) {
    playlist.value.push(...songs);
  }

  function getFirstSong() {
    return playlist.value.pop();
  }

  function playNext() {
    const song = getFirstSong();
    if (song) {
      playing.value = { ...song };
    }
  }

  async function playSong(songId?: number, songs?: Song[]) {
    console.log("playSong", { songId, songs });

    let _songs: Song[] = [];

    if (songs?.length) {
      _songs = [...songs];
    } else if (songId) {
      songs = await getSongs({ songId });
    }

    addSongsToPlaylist(_songs);
    playNext();
  }

  return {
    provide: {
      player: { loading, playlist, playing, addSongsToPlaylist, playSong },
    },
  };
});
