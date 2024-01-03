<template>
  <div class="card card-compact card-bordered hover:bg-base-25 group">
    <div class="card-body">
      <div class="w-full relative">
        <button
          class="absolute btn-circle btn btn-primary bottom-2 right-2 hidden group-hover:block shadow-lg"
        >
          <Icon name="ph:play-fill" />
        </button>

        <NuxtLink :to="{ name: 'albums-id', params: { id: album.id } }">
          <img :src="album.thumbnail!" class="rounded-md hover:shadow-2xl" />
        </NuxtLink>
      </div>

      <div class="line-clamp-1 font-bold card-title text-sm">
        <NuxtLink :to="{ name: 'albums-id', params: { id: album.id } }">
          {{ album.name }}
        </NuxtLink>
      </div>

      <!-- <div v-if="showArtist" class="font-light text-xs">
        <NuxtLink
          class="hover:underline"
          :to="{ name: 'artists-id', params: { id: album.artists.at(0)?.id } }"
        >
          {{ album.artists.at(0)?.name }}
        </NuxtLink>
      </div> -->

      <div v-if="album.releaseYear" class="font-light text-xs">
        {{ album.releaseYear }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetArtist } from "~/server/api/artists/[id]";

defineProps<{
  album: NonNullable<GetArtist>["albums"][number];
  showArtist?: boolean;
}>();
</script>
