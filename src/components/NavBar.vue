<script setup lang="ts">
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import {Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon} from '@heroicons/vue/24/outline'
import OldScale from '../assets/old-scale.png'
import {onMounted} from "vue";
import {getAuth, signOut} from "firebase/auth";
import router from "@/router";
import {useWeightsStore} from "@/stores/weights";
import {useAuthStore} from "@/stores/auth";

const weightsStore = useWeightsStore();
const navigation = [
  {name: 'Dashboard', to: '/dashboard'},
  {name: 'Weight input', to: '/weight-input'},
  {name: 'Profile', to: '/profile'},
]
const authStore = useAuthStore();


const handleSignOut = () => {
  signOut(authStore.auth).then(() => {
    router.push('/');
    weightsStore.reset();

  }).catch((error) => {
    // An error happened.
  });
}
</script>

<template>
    <Disclosure as="nav" class="bg-green-500" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6 text-black" aria-hidden="true"/>
                        <XMarkIcon v-else class="block h-6 w-6 text-black" aria-hidden="true"/>
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center">
                        <img class="block h-8 w-auto lg:hidden" :src="OldScale" alt="Your Company"/>
                        <img class="hidden h-8 w-auto lg:block" :src="OldScale" alt="Your Company"/>
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <RouterLink v-for="item in navigation" :key="item.name" :to="item.to"
                                        class="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">{{ item.name }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- Profile dropdown -->
                    <ArrowRightOnRectangleIcon class="h-6 cursor-pointer hover:text-gray-600" @click="handleSignOut"/>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <RouterLink v-for="item in navigation" :key="item.name" :to="item.to"
                            class="text-black block rounded-md px-3 py-2 text-base font-medium"
                            active-class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium">
                    <DisclosureButton class="w-full">
                        {{ item.name }}
                    </DisclosureButton>
                </RouterLink>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>