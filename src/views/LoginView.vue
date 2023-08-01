<script setup lang="ts">
import {ref, watch} from "vue";
import {useAuthStore} from "@/stores/auth";
import oldScale from "@/assets/old-scale.png";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const isError = ref(false);

watch(email, (newEmail) => {
    if (newEmail) {
        isError.value = false;
    }
});

watch(password, (newPassword) => {
    if (newPassword) {
        isError.value = false;
    }
});

const login = async () => {
    try {
        await authStore.login({email: email.value, password: password.value});

    } catch (error) {
      isError.value = true;
      password.value = "";
    }
}


</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
      <img :src="oldScale" alt="logo" class="block w-16 my-0 mx-auto"/>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm mb-2">
            <h2 class="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your
                account</h2>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <div :class=" isError ? 'bg-red-300 my-2 h-10 pt-1 font-normal text-sm text-red-900 text-center border-t border-b border-red-900' :'invisible my-2 h-10 pt-1'">Incorrect email address or password</div>
            <form class="space-y-6" @submit.prevent="login">

                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="text-sm">
                          <RouterLink to="/forgot-password" class="font-semibold text-green-500 hover:text-black">Forgot password?</RouterLink>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input v-model="password" id="password" name="password" type="password"
                               autocomplete="current-password" required
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <button type="submit"
                            class="flex w-full justify-center rounded-md bg-green-500 text-black px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300">
                        Sign in
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {{ ' ' }}
                <RouterLink to="/register" class="font-semibold leading-6 text-green-500  hover:text-black">Click here
                    to register
                </RouterLink>
            </p>
        </div>
    </div>
</template>


<style scoped>
</style>