<template>
  <div v-if="artist" class="">
    <ArtistsBanner :artist="artist" />

    <div class="p-5 page-width space-y-6">
      <div v-if="artistSongs.status.value === 'success'">
        <Subtitle>Canciones</Subtitle>
        <SongsList :songs="artistSongs.data.value.data" show-album show-cover />
      </div>

      <div>
        <Subtitle>Álbumes</Subtitle>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          <AlbumsCard
            v-for="(album, index) in artist.albums"
            :key="index"
            :album="album"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const id = useRoute().params.id;
const { data: artist, error } = await useFetch(`/api/artists/${id}`);

if (error.value) {
  await navigateTo("/");
}

const artistSongs = await useFetch("/api/songs", {
  query: { artistId: artist.value.id, limit: 5 },
  server: false,
});
</script>
