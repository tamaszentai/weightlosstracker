<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {ref, watch} from "vue";
import {ExclamationCircleIcon} from "@heroicons/vue/20/solid";
import { toast, type ToastOptions } from 'vue3-toastify';

enum responseTypes {
  success = 'success',
  error = 'error'
}

const authStore = useAuthStore();
const newPassword = ref('');
const newPasswordConfirm = ref('');
const isMatch = ref(true);
const isLength = ref(true);

watch(newPassword, (newPassword) => {
  if (newPassword) {
    isLength.value = true;
    isMatch.value = true;
  }
});

watch(newPasswordConfirm, (newPasswordConfirm) => {
  if (newPasswordConfirm) {
    isLength.value = true;
    isMatch.value = true;
  }
});

const changePassword = async () => {
  if (!checkPasswords()) {
    newPassword.value = "";
    newPasswordConfirm.value = "";
    return;
  }

  try {
    await authStore.changePassword(newPassword.value);
    newPassword.value = "";
    newPasswordConfirm.value = "";
    notify(responseTypes.success);
  } catch (e) {
    notify(responseTypes.error)
  }
}

const checkPasswords = () => {
  if (newPassword.value.length < 6 || newPasswordConfirm.value.length < 6) {
    isLength.value = false;
    return false;
  }

  if (newPassword.value !== newPasswordConfirm.value) {
    isMatch.value = false;
    return false;
  }

  isMatch.value = true;
  isLength.value = true;
  return true;
};

const notify = (type: string) => {
  switch (type) {
    case 'success':
      toast.success('The password has been updated',{position: 'top-right', transition: "flip", autoClose: 2000});
      break;
    case 'error':
      toast.error('Something went wrong, try again!',{position: 'top-right', transition: "flip", autoClose: 2000});
      break;
  }
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 my-0 mx-auto lg:px-8 lg:w-1/2 lg:my-0 lg:mx-auto">
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
      <div class="mt-1 rounded-md">
        <input v-model="newPassword" type="password"
               class="block w-full border rounded-md border-gray-200 py-1.5 text-gray-900 shadow-sm"/>
      </div>
      <label class="block text-sm font-medium leading-6 text-gray-900">
        Confirm New Password
      </label>
      <div class="mt-1 rounded-md">
        <input v-model="newPasswordConfirm" type="password"
               class="block w-full border rounded-md border-gray-200 py-1.5 text-gray-900 shadow-sm"/>
      </div>
      <div v-if="!isLength" class="mt-2 flex">
        <ExclamationCircleIcon class="text-red-500 h-6 w-6 inline-block"/>
        <p class="text-red-500 text-s italic inline-block">Passwords must be at least 6 characters long.</p>
      </div>
      <div v-if="!isMatch" class="mt-2 flex">
        <ExclamationCircleIcon class="text-red-500 h-6 w-6 inline-block"/>
        <p class="text-red-500 text-s italic inline-block">Passwords do not match.</p>
      </div>
      <div class="mt-6">
        <button type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out">
          Update Password
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>