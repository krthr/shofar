<template>
  <div class="page-width p-5" v-if="results">
    <FontHeader> Resultados para {{ search }} </FontHeader>

    <div v-if="results.songs.length">
      <FontSubtitle>Canciones</FontSubtitle>
      <SongsList
        :songs="results.songs"
        show-artist
        show-cover
        show-add-to-playlist
      />
    </div>

    <div v-if="results.albums.length">
      <FontSubtitle>Albumes</FontSubtitle>
      <AlbumsGrid :albums="results.albums" />
    </div>

    <div v-if="results.artists.length">
      <FontSubtitle>Artistas</FontSubtitle>
      <ArtistsGrid :artists="results.artists" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const search = computed(() => route.query.search);

if (typeof search.value !== "string" || search.value.trim().length === 0) {
  await navigateTo("/");
}

const { data } = await useFetch("/api/search", {
  params: { search },
  watch: [search],
});

const results = data;
</script>
