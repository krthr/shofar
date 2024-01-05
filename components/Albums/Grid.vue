<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
    <AlbumsCard v-for="(album, index) in albums" :key="index" :album="album" />
  </div>
</template>

<script setup lang="ts">
import type { Search } from "~/server/api/search";
import type { GetArtist } from "~/server/api/artists/[id]";

defineProps<{
  albums: Search["albums"] | NonNullable<GetArtist>["albums"];
}>();
</script>
