<template>
  <div v-if="album" class="p-5">
    <AlbumsBanner :album="album" />

    <div class="page-width mt-10">
      <SongsList
        :loading="albumSongs.pending.value"
        :songs="albumSongs.data.value?.data || []"
        show-index
        show-add-to-playlist
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

useHead({ title: `${album.value.name} de ${album.value.artists.at(0)?.name}` });
</script>
