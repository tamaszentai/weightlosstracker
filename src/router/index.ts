import {createRouter, createWebHistory} from 'vue-router'
import {getAuth, onAuthStateChanged} from "firebase/auth";
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
// @ts-ignore
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView,
            beforeEnter: async (to, from, next) => {
                if (await getCurrentUser()) {
                    next('/dashboard')
                } else {
                    next()
                }
            },
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPasswordView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/weight-input',
            name: 'weight-input',
            component: WeightInputView,
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: {
                requiresAuth: true
            },
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

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(getAuth(), (user) => {
            removeListener();
            resolve(user);
        }, reject);
    });
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            next("/")
        }
    } else {
        next();
    }
})

export default router
