<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "vue-router";
import oldScale from "@/assets/old-scale.png";


const router = useRouter();
const email = ref("");
const password = ref("");
const isError = ref(false);
const errorMessage = ref('');

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

const register = async () => {
    try {
        await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        router.push("/dashboard")

    } catch (error) {
      isError.value = true;
      errorMessage.value = error.message;
      password.value = "";
    }
}

const errorMessageComputed = computed(() => {
    let message = '';
    if (isError.value) {
        if (errorMessage.value.includes('auth/email-already-in-use')) {
            message = 'This email is already in use';
        }
        if (errorMessage.value.includes('Password should be at least 6 characters')) {
            message = 'Password should be at least 6 characters';
        }
    }
    return message;
})

</script>
<template>

    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
      <img :src="oldScale" alt="logo" class="block w-16 my-0 mx-auto"/>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm mb-2">
        <h2 class="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Account registration</h2>
      </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div :class=" isError ? 'bg-red-300 my-2 h-10 pt-1 font-normal text-sm text-red-900 text-center border-t border-b border-red-900' :'invisible my-2 h-10 pt-1'">
                {{ errorMessageComputed }}</div>
            <form class="space-y-6" @submit.prevent="register">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                               class="block w-full border rounded-md border-gray-200 py-1.5 text-gray-900 shadow-sm"/>
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <input v-model="password" id="password" name="password" type="password"
                               autocomplete="current-password" required
                               class="block w-full border rounded-md border-gray-200 py-1.5 text-gray-900 shadow-sm"/>
                    </div>
                </div>

                <div>
                    <button type="submit"
                            class="flex w-full justify-center rounded-md bg-green-500 text-black px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300">
                        Create account
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                <RouterLink to="/" class="font-semibold leading-6 text-green-500  hover:text-black">Back to login page
                </RouterLink>
            </p>
        </div>
    </div>
</template>


<style scoped>

</style>