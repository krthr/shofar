<template>
  <div v-if="album" class="p-5">
    <AlbumsBanner :album="album" />

    <div class="page-width mt-10">
      <SongsList
        v-if="albumSongs.status.value === 'success'"
        :songs="albumSongs.data.value.data"
        :show-cover="false"
        show-index
      />
    </div>
  </div>
</template>

<script setup>
const id = useRoute().params.id;

const { data: album, error } = await useFetch(`/api/albums/${id}`);

if (error.value || !album.value) {
  await navigateTo("/");
}

const albumSongs = await useFetch("/api/songs", {
  query: { albumId: album.value.id },
  server: false,
});
</script>
