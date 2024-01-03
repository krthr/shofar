<template>
  <nav
    class="w-full p-5 absolute top-0 bg-transparent z-50 bg-gradient-to-b from-primary-content/60"
  >
    <div class="flex items-center justify-between">
      <NuxtLink to="/">
        <h1 class="text-2xl font-medium">Shofar</h1>
      </NuxtLink>

      <div class="md:ml-8">
        <div class="join">
          <input
            v-model.trim="searchTerm"
            type="text"
            class="join-item input input-bordered input-md max-w-[200px]"
            placeholder="Buscar..."
            @keyup.enter="goToSearch()"
          />

          <button class="join-item btn btn-primary" @click="goToSearch()">
            <Icon name="ph:magnifying-glass" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const searchTerm = ref("");

const routeQuery = useRoute().query.search;
if (typeof routeQuery === "string") {
  searchTerm.value = routeQuery.trim();
}

async function goToSearch() {
  if (searchTerm.value.trim()) {
    await navigateTo({ name: "search", query: { search: searchTerm.value } });
  }
}
</script>
