<template>
  <SpeedInsights />

  <div class="w-full pb-[150px]">
    <NuxtLoadingIndicator />

    <Navbar />

    <div>
      <NuxtPage class="pt-[90px]" />
    </div>

    <LazyPlayer />
  </div>
</template>

<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
</script>
