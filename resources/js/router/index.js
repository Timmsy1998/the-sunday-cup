import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { Auth } from '../services/auth'

// Pages
import Landing from '@/pages/Landing.vue'
import Home from '@/pages/main/Home.vue'
import About from '@/pages/main/About.vue'
import Contact from '@/pages/main/Contact.vue'
import HallOfFame from '@/pages/main/HallOfFame.vue'
import Mobile from '@/pages/main/Mobile.vue'

import Dashboard from '@/pages/user/Dashboard.vue'
import Register from '@/pages/user/Register.vue'
import Login from '@/pages/user/Login.vue'

// Layouts
import LandingLayout from '@/layouts/Landing.vue'
import MainLayout from '@/layouts/Main.vue'
import UserLayout from '@/layouts/User.vue'
import MobileLayout from '@/layouts/Mobile.vue'

// Check For Mobile
const userAgent = window.navigator.userAgent
const android = userAgent.includes('Android')
const ios = userAgent.includes('iPhone')

// Build The Router
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
            path: '/mobile',
            component: Mobile,
            meta: { layout: MobileLayout },
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
                    meta: {
                        layout: UserLayout,
                        requiresAuth: true
                    },
                    beforeEnter(to, from, next) {
                        document.body.className = 'bg-user';
                        next();
                    },
                }
            ]
        },
    ],
});


router.beforeEach((to, from, next) => {
    store.dispatch('loadUserInfo')
    console.log(userAgent)
    console.log(android)
    console.log(ios)

    // check if user is on mobile, if so redirect
    if (to.path != "/mobile") {
        if (android == false && ios == false) {
            if (to.meta.requiresAuth) {
                // check if the user is logged in
                if (store.getters.isLoggedIn) {
                    // allow access to the route
                    next()
                } else {
                    // redirect to the login page
                    next({ path: '/user/login' })
                }
            } else {
                next()
            }
        } else {
            next({ path: '/mobile' })
        }
    } else {
        next()
    }
})



export default router
