import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css';
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';




const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID
};

initializeApp(firebaseConfig);

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Vue3Toasity);



app.mount('#app')
