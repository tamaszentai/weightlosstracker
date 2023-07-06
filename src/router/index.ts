import {createRouter, createWebHistory} from 'vue-router'
// @ts-ignore
import WeightInputView from '@/views/WeightInputView.vue'
// @ts-ignore
import LoginView from "@/views/LoginView.vue";
// @ts-ignore
import RegisterView from "@/views/RegisterView.vue";
// @ts-ignore
import DashboardView from "@/views/DashboardView.vue";
// @ts-ignore
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView
        },
        {
            path: '/weight-input',
            name: 'weight-input',
            component: WeightInputView
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView
        }
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import('../views/AboutView.vue')
        // }
    ]
})

export default router
