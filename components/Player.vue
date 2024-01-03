<template>
  <div v-show="openPlaylist" class="fixed bottom-[130px] left-0 p-5 z-20">
    <div class="card card-compact w-[300px]">
      <div class="card-body">
        <div class="flex">
          <p class="card-title text-sm font-medium">Lista de reproducción</p>
          <button
            class="btn btn-circle btn-ghost btn-sm"
            @click="openPlaylist = false"
          >
            <Icon name="ph:x" />
          </button>
        </div>

        <div class="max-h-[300px] overflow-y-scroll">
          <div
            v-for="(song, index) in $player.playlist.value.values()"
            :key="index"
          >
            {{ song.name }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="$player.playing.value"
    class="fixed w-full bottom-0 left-0 z-20 pointer-events-none p-5"
  >
    <div class="pointer-events-auto w-fit">
      <div class="flex justify-center card p-3 shadow-lg w-[300px]">
        <div class="flex items-center gap-3">
          <div>
            <NuxtLink
              class="w-24 h-24 flex"
              :to="{
                name: 'albums-id',
                params: { id: $player.playing.value.album.id },
              }"
            >
              <img
                :src="$player.playing.value.album.thumbnail!"
                class="w-24 h-24 aspect-square rounded-md"
              />
            </NuxtLink>
          </div>

          <div>
            <div class="mb-2">
              <NuxtLink
                class="text-base font-medium line-clamp-1 hover:underline"
                :to="{
                  name: 'albums-id',
                  params: { id: $player.playing.value.album.id },
                }"
              >
                {{ $player.playing.value.album.name }}
              </NuxtLink>
              <NuxtLink
                class="text-sm line-clamp-1 hover:underline"
                :to="{
                  name: 'artists-id',
                  params: {
                    id: $player.playing.value.album.artists.at(0)?.artist.id,
                  },
                }"
              >
                {{ $player.playing.value.album.artists.at(0)?.artist.name }}
              </NuxtLink>
            </div>

            <div class="gap-2 flex">
              <button class="btn btn-ghost btn-circle">
                <Icon name="ph:play-fill" size="20" />
              </button>

              <button class="btn btn-ghost btn-circle">
                <Icon name="ph:skip-forward-fill" size="20" />
              </button>

              <button
                class="btn btn-ghost btn-circle"
                @click="openPlaylist = !openPlaylist"
              >
                <Icon name="ph:playlist" size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const openPlaylist = ref(false);
const { $player } = useNuxtApp();
</script>
