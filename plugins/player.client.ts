import type { GetSongs } from "~/server/api/songs";

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

type Song = GetSongs["data"][number];

export default defineNuxtPlugin(() => {
  const playlist = ref(new Map<string, Song>());
  const playing = ref<Song | undefined>();

  function addSongs(songs: Song[]) {
    for (const song of songs) {
      playlist.value.set(`${Date.now()}-${song.id}`, song);
    }
  }

  function getFirstSong() {
    const iter = playlist.value.entries();
    const firstElement = iter.next().value;

    if (firstElement) {
      playlist.value.delete(firstElement[0]);
      return firstElement[1] as Song;
    }

    return undefined;
  }

  function playNext() {
    const song = getFirstSong();
    if (song) {
      playing.value = { ...song };
    }
  }

  async function playSong(songId: number) {
    const songs = await getSongs({ songId });
    addSongs(songs);
    playNext();
  }

  return { provide: { player: { playlist, playing, playSong } } };
});
