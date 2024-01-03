<template>
  <div class="w-full">
    <div
      v-for="(song, index) in songs"
      :key="index"
      class="flex items-center group gap-4 p-2 hover:bg-base-25 rounded-md"
    >
      <div
        v-if="showIndex"
        :class="{
          'w-5 h-5': dense,
          'w-14 h-14': !dense,
          'text-center font-normal flex items-center justify-center': true,
        }"
      >
        <div class="group-hover:hidden">
          {{ index + 1 }}
        </div>

        <div
          class="group-hover:block hidden"
          @click="$player.playSong(song.id)"
        >
          <button>
            <Icon name="ph:play-fill" />
          </button>
        </div>
      </div>

      <div v-if="showCover" class="text-center w-14 h-14 relative">
        <button
          class="absolute shadow-xl top-0 bottom-0 right-0 left-0 hidden group-hover:block z-10"
          @click="$player.playSong(song.id)"
        >
          <Icon name="ph:play-fill" class="text-white" size="20" />
        </button>

        <div
          class="absolute bg-black/40 w-full h-full hidden group-hover:block"
        ></div>

        <img
          :src="song.album.thumbnail!"
          class="w-14 h-14 rounded-md relative"
        />
      </div>

      <div class="flex-1">
        <div>
          <NuxtLink
            class="font-medium text-white line-clamp-1"
            :to="{ name: 'albums-id', params: { id: song.album.id } }"
          >
            {{ song.name }}
          </NuxtLink>
        </div>

        <div v-if="showAlbum">
          <NuxtLink
            class="text-sm hover:underline line-clamp-1"
            :to="{
              name: 'albums-id',
              params: { id: song.album.id },
            }"
          >
            {{ song.album.name }}
          </NuxtLink>
        </div>

        <div v-if="showArtist">
          <NuxtLink
            class="text-sm hover:underline line-clamp-1"
            :to="{
              name: 'artists-id',
              params: { id: song.artists.at(0)?.id },
            }"
          >
            {{ song.artists.at(0)?.name }}
          </NuxtLink>
        </div>
      </div>

      <div v-if="showAddToPlaylist" class="col-start-13">
        <button
          class="btn btn-ghost btn-circle"
          @click="$player.addSongsToPlaylist([song])"
        >
          <Icon name="ph:list-plus-fill" size="25" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Search } from "~/server/api/search";
import type { GetSongs } from "~/server/api/songs/index";

defineProps<{
  songs: Search["songs"] | GetSongs["data"];

  dense?: boolean;

  showIndex?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showArtist?: boolean;
  showAddToPlaylist?: boolean;
}>();

const { $player } = useNuxtApp();
</script>
