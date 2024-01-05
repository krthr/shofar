<script setup lang="ts">
import type { GetAlbum } from "@/server/api/albums/[id]";
import type { GetArtist } from "@/server/api/artists/[id]";

defineProps<{
  media: NonNullable<GetAlbum | GetArtist>;
  type: "artist" | "album";
}>();
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center bg-[#171212]">
    <div class="w-[600px] pl-[100px]">
      <p class="uppercase text-[24px] text-[#1eb853] mb-4 font-semibold">
        {{ type === "artist" ? "Artista" : "Album" }}
      </p>
      <h1
        class="w-[600px] m-0 text-[75px] font-semibold mb-4 text-white flex items-center line-clamp-2"
      >
        <span>{{ media.name }}</span>
      </h1>

      <p
        v-if="type === 'album'"
        class="text-[32px] text-[#E4E4E7] leading-tight line-clamp-1"
      >
        {{ (media as GetAlbum)!.artists.at(0)?.name }}
      </p>
    </div>

    <div class="absolute top-[160px] right-[90px]">
      <img
        :src="media.thumbnail!"
        class="w-[340px] h-[340px]"
        :class="[type === 'artist' ? 'rounded-full' : 'rounded-md']"
        width="340"
        height="340"
      />
    </div>
  </div>
</template>
