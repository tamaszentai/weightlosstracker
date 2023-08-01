<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import {onAuthStateChanged} from "firebase/auth";
import {onMounted, ref} from "vue";
import {useAuthStore} from "./stores/auth";
import {useWeightsStore} from "@/stores/weights";
import DashboardView from "@/views/DashboardView.vue";
import ProfileView from "@/views/ProfileView.vue";

const authStore = useAuthStore();
const weightsStore = useWeightsStore();
const auth = authStore.auth;
const isLoggedIn = ref(false);

const routes = [
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/profile',
    component: ProfileView,
    meta: { transition: 'slide-right' },
  },
]


onMounted(() => {
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

<!--  <router-view v-slot="{ Component }">-->
<!--    <transition>-->
<!--      <component :is="Component" />-->
<!--    </transition>-->
<!--  </router-view>-->
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
