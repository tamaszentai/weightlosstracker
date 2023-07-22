import {defineStore} from "pinia";
import {ref} from "vue";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import router from "../router";

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<any | null>(null);


    const login = async (user: any) => {
        currentUser.value = (await signInWithEmailAndPassword(getAuth(), user.email, user.password)).user;
        await router.push("/dashboard")
    }

    const auth = getAuth();
    onAuthStateChanged(auth, async () => {
        currentUser.value = auth.currentUser;
    });

    return {
        currentUser,
        login,
    }
});