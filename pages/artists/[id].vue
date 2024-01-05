<template>
  <div v-if="artist" class="">
    <ArtistsBanner :artist="artist" />

    <div class="p-5 page-width space-y-6">
      <div>
        <FontSubtitle>Canciones</FontSubtitle>
        <SongsList
          :loading="artistSongs.pending.value"
          :songs="artistSongs.data.value?.data || []"
          show-album
          show-cover
          show-add-to-playlist
        />
      </div>

      <div>
        <FontSubtitle>Álbumes</FontSubtitle>
        <AlbumsGrid :albums="artist.albums" />
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

useHead({
  title: `Discografía de ${artist.value.name}`,
});
</script>
