<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import {useRoute} from "vue-router";

const currentRoute = useRoute();
</script>
<template>
  <nav-bar  v-if="currentRoute.fullPath !== '/'"/>
  <RouterView />
</template>

<style scoped>
</style>
