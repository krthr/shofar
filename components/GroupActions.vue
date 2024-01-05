<template>
  <div class="mt-5 mb-1 gap-2 flex">
    <button class="btn btn-primary">
      <Icon name="ph:play-fill" size="25" />
      Reproducir
    </button>

    <button class="btn">
      <Icon name="ph:plus" size="25" />
      Agregar a lista
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  albumId?: number;
  artistId?: number;
}>();
</script>
