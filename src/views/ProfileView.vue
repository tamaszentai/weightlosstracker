<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {ref} from "vue";

const authStore = useAuthStore();
const newPassword = ref('');
const newPasswordConfirm = ref('');

const changePassword = async () => {
    try {
        await authStore.changePassword(newPassword.value);
    } catch (e) {
        console.log(e);
    }
}

const checkPasswords = () => {
    return newPassword.value === newPasswordConfirm.value;
}

</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
        <div v-if="authStore.currentUser">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Profile</h2>
            </div>
            <label class="block text-sm font-medium leading-5 text-gray-700 mt-6">
                Email: {{ authStore.currentUser.email }}
            </label>
            <label class="block text-sm font-medium leading-5 text-gray-700 mt-6">
                Registered: {{ authStore.currentUser.metadata.creationTime }}
            </label>
        </div>
      <form class="mt-10" @submit.prevent="changePassword">
        <label class="block text-sm font-medium leading-6 text-gray-900">
          New Password
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input v-model="newPassword" type="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" />
        </div>
        <label class="block text-sm font-medium leading-6 text-gray-900">
          Confirm New Password
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input v-model="newPasswordConfirm" type="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" />
        </div>

        <div class="mt-6">
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out">
            Update Password
          </button>
        </div>
      </form>
    </div>
</template>

<style scoped>

</style>