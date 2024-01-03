<template>
  <div class="page-width p-5" v-if="results">
    <Header> Resultados para {{ search }} </Header>

    <div v-if="results.songs.length">
      <Subtitle>Canciones</Subtitle>
      <SongsList
        :songs="results.songs"
        show-artist
        show-cover
        show-add-to-playlist
      />
    </div>

    <div v-if="results.albums.length">
      <Subtitle>Albumes</Subtitle>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AlbumsCard
          v-for="album in results.albums"
          :key="album.id"
          :album="album"
          show-artist
        />
      </div>
    </div>

    <div v-if="results.artists.length">
      <Subtitle>Artistas</Subtitle>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <ArtistsCard
          v-for="artist in results.artists"
          :key="artist.id"
          :artist="artist"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const search = computed(() => route.query.search);

const { data } = await useFetch("/api/search", {
  params: { search },
  watch: [search],
});

const results = data;
</script>
