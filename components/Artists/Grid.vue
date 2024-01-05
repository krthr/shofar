<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <ArtistsCard v-for="artist in artists" :key="artist.id" :artist="artist" />
  </div>
</template>

<script setup lang="ts">
import type { Search } from "@/server/api/search";

defineProps<{
  artists: Search["artists"];
}>();
</script>
