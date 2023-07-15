<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {onMounted, ref} from "vue";
import {useAuthStore} from "./stores/auth";

const authStore = useAuthStore();
const isLoggedIn = ref(false);


let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
})

</script>
<template>
  <nav-bar v-if="isLoggedIn"/>
  <RouterView/>
</template>

<style scoped>
</style>
