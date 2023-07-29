<script setup lang="ts">
import oldScale from "@/assets/old-scale.png";
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import { toast, type ToastOptions } from 'vue3-toastify';

enum responseTypes {
  success = 'success',
  error = 'error'
}

const email = ref("");
const authStore = useAuthStore();

const resetPassword = async () => {
  try {
    await authStore.resetPassword(email.value);
    notify(responseTypes.success)
    email.value = "";
  } catch (error) {
    notify(responseTypes.error)
  }
}

const notify = (type: string) => {
  switch (type) {
    case 'success':
      toast.success('The email has been sent!',{position: 'top-right', transition: "flip", autoClose: 2000});
      break;
    case 'error':
      toast.error('Something went wrong, try again!',{position: 'top-right', transition: "flip", autoClose: 2000});
      break;
  }
}

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
    <img :src="oldScale" alt="logo" class="block w-16 my-0 mx-auto"/>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm mb-2">
      <h2 class="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Forgot your password</h2>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <p class="mt-6 text-sm text-center">Please enter the email address you'd like your password send to</p>
      <form class="space-y-6 mt-6" @submit.prevent="resetPassword">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <button type="submit"
                  class="flex w-full justify-center rounded-md bg-green-500 text-black px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300">
           Request reset email
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm">
        <RouterLink to="/" class="font-semibold leading-6 text-green-500  hover:text-black">Back to login
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>