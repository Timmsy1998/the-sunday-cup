import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import { Auth } from "../services/auth";

// Pages
import Landing from "@/pages/Landing.vue";
import Home from "@/pages/main/Home.vue";
import About from "@/pages/main/About.vue";
import Contact from "@/pages/main/Contact.vue";
import HallOfFame from "@/pages/main/HallOfFame.vue";
import Mobile from "@/pages/main/Mobile.vue";

import Dashboard from "@/pages/user/Dashboard.vue";
import Register from "@/pages/user/Register.vue";
import Login from "@/pages/user/Login.vue";
import CreateTeam from "@/pages/user/team/Create.vue";

// Layouts
import LandingLayout from "@/layouts/Landing.vue";
import MainLayout from "@/layouts/Main.vue";
import UserLayout from "@/layouts/User.vue";
import MobileLayout from "@/layouts/Mobile.vue";
import { nextTick } from "vue";

// Check For Mobile
const userAgent = window.navigator.userAgent;
const android = userAgent.includes("Android");
const ios = userAgent.includes("iPhone");

// Build The Router
const history = createWebHistory();
const router = createRouter({
    history,
    routes: [
        {
            path: "/",
            redirect: "/landing",
            beforeEnter(to, from, next) {
                document.body.className = "bg-default";
                next();
            },
        },
        {
            path: "/dashboard",
            redirect: "/user/dashboard",
        },
        {
            path: "/login",
            redirect: "/user/login",
        },
        {
            path: "/register",
            redirect: "/user/register",
        },
        {
            path: "/mobile",
            component: Mobile,
            meta: { layout: MobileLayout },
            beforeEnter(to, from, next) {
                document.body.className = "bg-default";
                next();
            },
        },
        {
            path: "/landing",
            component: Landing,
            meta: { layout: LandingLayout },
            beforeEnter(to, from, next) {
                document.body.className = "bg-default";
                next();
            },
        },
        {
            path: "/home",
            component: Home,
            meta: { layout: MainLayout },
            beforeEnter(to, from, next) {
                document.body.className = "bg-default";
                next();
            },
            children: [
                {
                    path: "about",
                    component: About,
                    meta: { layout: MainLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = "bg-default";
                        next();
                    },
                },
                {
                    path: "contact",
                    component: Contact,
                    meta: { layout: MainLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = "bg-default";
                        next();
                    },
                },
                {
                    path: "hall-of-fame",
                    component: HallOfFame,
                    meta: { layout: MainLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = "bg-default";
                        next();
                    },
                },
            ],
        },
        {
            path: "/user",
            redirect: "/user/dashboard",
            beforeEnter(to, from, next) {
                document.body.className = "bg-user";
                next();
            },
            children: [
                {
                    path: "login",
                    component: Login,
                    meta: { layout: UserLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = "bg-user";
                        next();
                    },
                },
                {
                    path: "register",
                    component: Register,
                    meta: { layout: UserLayout },
                    beforeEnter(to, from, next) {
                        document.body.className = "bg-user";
                        next();
                    },
                },
                {
                    path: "dashboard",
                    component: Dashboard,
                    meta: {
                        layout: UserLayout,
                        requiresAuth: true,
                        minRole: "1",
                    },
                    beforeEnter(to, from, next) {
                        document.body.className = "bg-user";
                        next();
                    },
                },
                {
                    path: "team/create",
                    component: CreateTeam,
                    meta: {
                        layout: UserLayout,
                        requiresAuth: true,
                        minRole: "1",
                    },
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    store.dispatch("loadUserInfo");
    // check if user is on mobile, if so redirect
    if (to.path != "/mobile") {
        if (android == false && ios == false) {
            if (to.path.startsWith("/user")) {
                if (to.path.endsWith("register") || to.path.endsWith("login")) {
                    if (store.getters.isLoggedIn) {
                        next({ path: "/user/dashboard" });
                    } else if (
                        !store.getters.isLoggedIn ||
                        store.getters.isLoggedIn === ""
                    ) {
                        next();
                    }
                } else {
                    if (to.meta.requiresAuth) {
                        // check if the user is logged in
                        if (store.getters.isLoggedIn) {
                            if (to.meta.minRole >= "1") {
                                next();
                            } else if (to.meta.minRole >= "2") {
                                if (store.getters.role >= "2") {
                                    next();
                                } else {
                                    next({ path: "/user/dashboard" });
                                }
                            } else if (to.meta.minRole >= "3") {
                                if (store.getters.role >= "3") {
                                    next();
                                } else {
                                    next({ path: "/user/dashboard" });
                                }
                            } else if (to.meta.minRole >= "4") {
                                if (store.getters.role >= "4") {
                                    next();
                                } else {
                                    next({ path: "/user/dashboard" });
                                }
                            }
                        } else {
                            // redirect to the login page
                            next({ path: "/user/login" });
                        }
                    } else {
                        next();
                    }
                }
            } else {
                next();
            }
        } else {
            next({ path: "/mobile" });
        }
    } else {
        next();
    }
});

export default router;
