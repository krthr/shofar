<template>
  <div class="relative overflow-hidden w-full mt-[-90px]">
    <div
      class="relative pt-[90px] z-10 bottom-0 p-5 flex items-center flex-wrap gap-4 h-auto page-width w-full"
    >
      <img
        class="w-32 h-32 md:w-60 md:h-60 aspect-square rounded-full shadow-lg"
        :src="artist.thumbnail!"
      />

      <div class="relative h-auto">
        <h1
          class="font-medium text-5xl md:text-7xl line-clamp-2 md:line-clamp-1 md:max-w-5xl"
        >
          {{ artist.name }}
        </h1>

        <GroupActions :artist-id="artist.id" />
      </div>
    </div>

    <div
      class="absolute w-full h-full filter backdrop-blur-lg bg-transparent top-0 z-[1] bg-base-100/50"
    ></div>

    <img
      class="absolute w-full h-full object-cover z-0 top-0"
      :src="artist.thumbnail!"
    />
  </div>
</template>

<script setup lang="ts">
import type { GetArtist } from "~/server/api/artists/[id]";

defineProps<{
  artist: NonNullable<GetArtist>;
}>();
</script>
