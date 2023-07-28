import {defineStore} from "pinia";
import {ref} from "vue";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import router from "../router";

export const useAuthStore = defineStore('auth', () => {
        const currentUser = ref<any | null>(null);

        const auth = getAuth();
        onAuthStateChanged(auth, async () => {
            currentUser.value = auth.currentUser;
        });

        const login = async (user: any) => {
            currentUser.value = (await signInWithEmailAndPassword(getAuth(), user.email, user.password)).user;
            await router.push("/dashboard")
        }


        const resetPassword = async (email: string) => {
            await sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    // ..
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }


        return {
            currentUser,
            login,
            resetPassword
        }
    })
;