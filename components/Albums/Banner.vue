<template>
  <div class="flex items-end gap-4 flex-wrap justify-center page-width">
    <div class="flex">
      <img
        :src="album.thumbnail!"
        class="rounded-md w-[200px] h-[200px] aspect-square"
      />
    </div>

    <div class="flex-initial md:flex-1 text-center md:text-left">
      <h1 class="font-medium text-4xl md:text-5xl line-clamp-1">
        {{ album.name }}
      </h1>

      <div>
        <NuxtLink
          v-for="artist in album.artists"
          :key="artist.id"
          class="hover:underline font-medium"
          :to="{ name: 'artists-id', params: { id: artist.id } }"
        >
          {{ artist.name }}
        </NuxtLink>
      </div>

      <GroupActions :album-id="album.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetAlbum } from "~/server/api/albums/[id]";

defineProps<{ album: NonNullable<GetAlbum> }>();
</script>
