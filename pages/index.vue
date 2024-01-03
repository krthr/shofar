<template>
  <div class="p-5 page-width">
    <!-- <h1 class="text-xl font-medium">Artistas</h1> -->

    <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
      <ArtistsCard
        v-for="artist in artists.data"
        :key="artist.id"
        :artist="artist"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/artists");
const artists = data.value!;
</script>
