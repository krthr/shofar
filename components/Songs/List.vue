<template>
  <div class="w-full">
    <div v-show="loading">
      <div v-for="i in 3" :key="i" class="w-full p-2 gap-2 flex">
        <div class="skeleton rounded-md h-10 flex-1"></div>
        <div class="skeleton w-10 rounded-md"></div>
      </div>
    </div>

    <div
      v-for="(song, index) in songs"
      :key="index"
      class="flex items-center group gap-4 p-2 hover:bg-base-25 rounded-md"
    >
      <div
        v-if="isDesktop && showIndex"
        :class="{
          'w-5 h-5': dense,
          'w-14 h-14': !dense,
          'text-center font-normal md:flex items-center justify-center hidden': true,
        }"
      >
        <div class="group-hover:hidden">
          {{ index + 1 }}
        </div>

        <div class="group-hover:block hidden">
          <button @click="$emit('playSong', index, song.id, song)">
            <Icon name="ph:play-fill" />
          </button>
        </div>
      </div>

      <div v-if="showCover" class="text-center w-14 h-14 relative">
        <button
          class="absolute shadow-xl top-0 bottom-0 right-0 left-0 hidden group-hover:block z-10"
        >
          <Icon name="ph:play-fill" class="text-white" size="20" />
        </button>

        <div
          class="absolute bg-black/40 w-full h-full hidden group-hover:block"
        ></div>

        <img
          :src="song.album.thumbnail!"
          class="w-14 h-14 rounded-md relative"
          @click="$emit('playSong', index, song.id, song)"
        />
      </div>

      <div class="flex-1">
        <div @click="$emit('playSong', index, song.id, song)">
          <div class="font-medium text-white line-clamp-1">
            {{ song.name }}
          </div>
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

      <div v-if="showAddToPlaylist">
        <button
          class="btn btn-ghost btn-circle btn-sm md:btn-normal"
          @click="$emit('addToPlaylist', index, song.id, song)"
        >
          <Icon name="ph:list-plus-fill" class="w-5 h-5" />
        </button>
      </div>

      <div v-if="showRemoveFromList" class="">
        <button
          class="btn btn-ghost btn-circle btn-sm"
          @click="$emit('removeFromList', index, song.id, song)"
        >
          <Icon name="ph:x" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Search } from "~/server/api/search";
import type { GetSongs } from "~/server/api/songs/index";

defineProps<{
  loading?: boolean;
  songs: Search["songs"] | GetSongs["data"];

  dense?: boolean;

  showIndex?: boolean;
  showCover?: boolean;
  showAlbum?: boolean;
  showArtist?: boolean;
  showAddToPlaylist?: boolean;
  showRemoveFromList?: boolean;
}>();

const { isDesktop } = useDevice();

defineEmits<{
  playSong: [index: number, id: number, song: GetSongs["data"][number]];
  addToPlaylist: [index: number, id: number, song: GetSongs["data"][number]];
  removeFromList: [index: number, id: number, song: GetSongs["data"][number]];
}>();
</script>
