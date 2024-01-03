<template>
  <div class="w-full pb-[150px]">
    <NuxtLoadingIndicator />

    <Navbar />

    <div>
      <NuxtPage class="pt-[90px]" />
    </div>

    <LazyPlayer v-if="$player" />
  </div>
</template>

<script setup lang="ts">
const { $player } = useNuxtApp();
</script>
