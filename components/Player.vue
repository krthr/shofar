<template>
  <div
    v-show="openPlaylist"
    class="fixed bottom-[130px] left-0 p-5 z-20 w-screen md:w-[400px]"
  >
    <div class="card card-compact">
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

        <SongsList
          :songs="$player.playlist.value"
          class="max-h-[500px] overflow-y-scroll"
          dense
          show-index
          show-artist
          show-cover
          show-remove-from-list
        />
      </div>
    </div>
  </div>

  <div class="fixed w-full bottom-0 left-0 z-20 pointer-events-none p-5">
    <div class="pointer-events-auto w-fit">
      <div class="flex justify-center card p-3 shadow-lg max-w-[300px]">
        <div class="flex items-center gap-3">
          <div v-if="$player.playing.value">
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
            <div v-if="$player.playing.value" class="mb-2">
              <NuxtLink
                class="text-base font-medium line-clamp-1 hover:underline"
                :to="{
                  name: 'albums-id',
                  params: { id: $player.playing.value.album.id },
                }"
              >
                {{ $player.playing.value.name }}
              </NuxtLink>
              <NuxtLink
                class="text-sm line-clamp-1 hover:underline"
                :to="{
                  name: 'artists-id',
                  params: {
                    id: $player.playing.value.artists.at(0)?.id,
                  },
                }"
              >
                {{ $player.playing.value.artists.at(0)?.name }}
              </NuxtLink>
            </div>

            <div class="gap-2 flex">
              <button
                class="btn btn-ghost btn-circle"
                v-if="$player.playing.value"
              >
                <Icon name="ph:play-fill" size="20" />
              </button>

              <button
                class="btn btn-ghost btn-circle"
                v-if="$player.playing.value"
              >
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
