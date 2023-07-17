<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import {storeToRefs} from "pinia";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {onMounted, ref} from "vue";
import {useAuthStore} from "./stores/auth";
import {useWeightsStore} from "@/stores/weights";

const authStore = useAuthStore();
const weightsStore = useWeightsStore();
const {currentUser} = storeToRefs(authStore);
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
