<template>
  <div class="card card-compact hover:bg-base-25 group">
    <div class="card-body text-center">
      <div class="w-full relative">
        <button
          class="absolute btn-circle btn btn-primary bottom-2 right-2 hidden group-hover:block shadow-lg"
        >
          <Icon name="ph:play-fill" />
        </button>

        <NuxtLink :to="{ name: 'artists-id', params: { id: artist.id } }">
          <img :src="artist.thumbnail!" class="rounded-full" />
        </NuxtLink>
      </div>

      <NuxtLink :to="{ name: 'artists-id', params: { id: artist.id } }">
        <h2
          class="text-center card-title line-clamp-1 text-sm md:text-base font-bold"
        >
          {{ artist.name }}
        </h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetArtists } from "~/server/api/artists";
import type { Search } from "~/server/api/search";

defineProps<{
  artist: GetArtists["data"][number] | Search["artists"][number];
}>();
</script>
