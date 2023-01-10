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
            redirect: '/landing',
            beforeEnter(to, from, next) {
                document.body.className = 'bg-default';
                next();
              },
        },
        {
            path: '/landing',
            component: Landing,
            meta: { layout: LandingLayout },
            beforeEnter(to, from, next) {
                document.body.className = 'bg-default';
                next();
              },
        },
        {
            path: '/home',
            component: Home,
            meta: { layout: MainLayout },
            beforeEnter(to, from, next) {
                document.body.className = 'bg-default';
                next();
              },
            children: [
                {
                    path: 'about',
                    component: About,
                    meta: { layout: MainLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = 'bg-default';
                        next();
                      },
                },
                {
                    path: 'contact',
                    component: Contact,
                    meta: { layout: MainLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = 'bg-default';
                        next();
                      },
                },
                {
                    path: 'hall-of-fame',
                    component: HallOfFame,
                    meta: { layout: MainLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = 'bg-default';
                        next();
                      },
                }
            ]
        },
        {
            path: '/user',
            redirect: '/user/dashboard',
            beforeEnter(to, from, next) {
                document.body.className = 'bg-user';
                next();
              },
            children: [
                {
                    path: 'login',
                    component: Login,
                    meta: { layout: UserLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = 'bg-user';
                        next();
                      },
                },
                {
                    path: 'register',
                    component: Register,
                    meta: { layout: UserLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = 'bg-user';
                        next();
                      },
                },
                {
                    path: 'dashboard',
                    component: Dashboard,
                    meta: { layout: UserLayout },
                    beforeEnter: routeGuard,
                    beforeEnter(to, from, next) {
                        document.body.className = 'bg-user';
                        next();
                      },
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
