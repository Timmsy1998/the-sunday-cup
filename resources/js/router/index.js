import { createRouter, createWebHistory } from 'vue-router'
import { routeGuard } from '../store'
import { useStore } from 'vuex';


// Pages
import Landing from '@/pages/Landing.vue'
import Home from '@/pages/main/Home.vue'
import About from '@/pages/main/About.vue'
import Contact from '@/pages/main/Contact.vue'
import HallOfFame from '@/pages/main/HallOfFame.vue'

import Dashboard from '@/pages/user/Dashboard.vue'
import Register from '@/pages/user/Register.vue'
import Login from '@/pages/user/Login.vue'

// Layouts
import LandingLayout from '@/layouts/Landing.vue'
import MainLayout from '@/layouts/Main.vue'
import UserLayout from '@/layouts/User.vue'

const store = useStore();
const history = createWebHistory()
const router = createRouter({
    history,
    routes: [
        {
            path: '/',
            redirect: '/landing'
        },
        {
            path: '/landing',
            component: Landing,
            meta: { layout: LandingLayout },
        },
        {
            path: '/home',
            component: Home,
            meta: { layout: MainLayout },
            children: [
                {
                    path: 'about',
                    component: About,
                    meta: { layout: MainLayout },
                },
                {
                    path: 'contact',
                    component: Contact,
                    meta: { layout: MainLayout },
                },
                {
                    path: 'hall-of-fame',
                    component: HallOfFame,
                    meta: { layout: MainLayout },
                }
            ]
        },
        {
            path: '/user',
            redirect: '/user/dashboard',
            children: [
                {
                    path: 'login',
                    component: Login,
                    meta: { layout: UserLayout },
                },
                {
                    path: 'register',
                    component: Register,
                    meta: { layout: UserLayout },
                },
                {
                    path: 'dashboard',
                    component: Dashboard,
                    meta: { layout: UserLayout },
                    beforeEnter: routeGuard,
                }
            ]
        },
        {
            path: '/api/set-session',
            beforeEnter(to, from, next) {
                store.commit('setSession', to.query.session);
                next();
            },
        },
    ],
})

export default router
