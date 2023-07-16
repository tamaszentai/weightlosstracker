<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore();

</script>

<template>
  <div v-if="authStore.currentUser" class="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Profile</h2>
    </div>
    <label class="block text-sm font-medium leading-5 text-gray-700 mt-6">
      Email: {{authStore.currentUser.email}}
    </label>
    <label class="block text-sm font-medium leading-5 text-gray-700 mt-6">
      Registered: {{authStore.currentUser.metadata.creationTime}}
    </label>
  </div>
</template>

<style scoped>

</style>