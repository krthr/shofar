import type { GetSongs } from "~/server/api/songs";

type Song = GetSongs["data"][number];

export default defineNuxtPlugin(() => {
  const loadingSong = ref(false);
  const playlist = ref<Song[]>([]);
  const playing = ref<Song | undefined>();
  const isReady = ref(false);

  return {
    provide: {
      player: { loadingSong, playlist, playing, isReady },
    },
  };
});
