<template>
  <div class="p-5 page-width">
    <!-- <h1 class="text-xl font-medium">Artistas</h1> -->
    <ArtistsGrid :artists="artists.data" />
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/artists");
const artists = data.value!;
</script>
