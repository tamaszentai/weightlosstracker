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
    <Transition>
        <RouterView/>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>
