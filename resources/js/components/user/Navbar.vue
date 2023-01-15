<template>
    <nav class="navigation d-flex flex-column position-fixed h-100 w-15 top-0" :aria-expanded="isExpanded">
        <!-- Logo -->
        <div class="logo p-3 d-flex justify-content-center align-items-center">
            <img src="../../../images/Logo-No-BG.png" alt="Logo">
        </div>

        <!-- Sidebar items -->
        <ul class="navbar-nav flex-column">
            <li class="nav-item" v-for="category in categories" :key="category.id"
                @click="category.expanded = !category.expanded" v-if="isLoggedIn || !category.requireAuth">
                <a class="nav-link d-flex">
                    <i :class="category.icon" style="margin-right: 1rem;"></i>
                    <span class="d-none d-md-flex">{{ category.name }}</span>
                    <i v-if="category.expanded" class="fas fa-angle-up"></i>
                    <i v-else class="fas fa-angle-down" style="margin-left: 1rem;"></i>
                </a>
                <ul class="navbar-nav flex-column" v-if="category.expanded">
                    <li class="nav-item" v-for="subCategory in category.subCategories" :key="subCategory.id">
                        <a class="nav-link d-flex" style="cursor: pointer;" @click="$router.push(subCategory.link)">
                            <i :class="subCategory.icon" style="margin-right: 1rem;"></i>
                            <span class="d-none d-md-flex">{{ subCategory.name }}</span>
                        </a>
                    </li>
                </ul>
            <li class="nav-item logout-link" @click="logout" v-if="isLoggedIn">
                <a class="nav-link d-flex" style="cursor: pointer;">
                    <i class="fas fa-sign-out-alt" style="margin-right: 1rem;"></i>
                    <span class="d-none d-md-flex">Logout</span>
                </a>
            </li>
            </li>
        </ul>
    </nav>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            isExpanded: false,
            categories: [
                {
                    id: 1,
                    name: 'Home',
                    icon: 'fas fa-home',
                    expanded: false,
                    requireAuth: false,
                    subCategories: [
                        {
                            id: 1,
                            name: 'Dashboard',
                            icon: 'fas fa-tachometer-alt',
                            link: '/user/dashboard'
                        },
                    ]
                },
                {
                    id: 2,
                    name: 'Users',
                    icon: 'fas fa-users',
                    expanded: false,
                    requireAuth: true,
                    subCategories: [
                        {
                            id: 1,
                            name: 'List Users',
                            icon: 'fas fa-list-ul',
                            link: '/users/list'
                        },
                        {
                            id: 2,
                            name: 'Add User',
                            icon: 'fas fa-user-plus',
                            link: '/users/add'
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Settings',
                    icon: 'fas fa-cog',
                    expanded: false,
                    requireAuth: true,
                    subCategories: [
                        {
                            id: 1,
                            name: 'General',
                            icon: 'fas fa-wrench',
                            link: '/settings/general'
                        },
                        {
                            id: 2,
                            name: 'Security',
                            icon: 'fas fa-shield-alt',
                            link: '/settings/security'
                        },
                        {
                            id: 3,
                            name: 'Account',
                            icon: 'fas fa-user',
                            link: '/settings/account'
                        }

                    ]
                }
            ],
        };
    },
    computed: {
        ...mapGetters(['username', 'summonerName', 'rank', 'isLoggedIn', 'token']),
        isLoggedIn() {
            // Check the session status in the Vuex store
            return this.$store.state.userinfo.isLoggedIn
        },
    },
    methods: {
        toggleSidebar() {
            this.isExpanded = !this.isExpanded;
        },
        async logout() {
            try {
                // Send a post request to the logout endpoint
                await axios.post('/api/logout');
                // Clear the user's data from the store
                localStorage.removeItem('vuex');
                this.$store.commit('clearUserData')
                // redirect the user to login page
                this.$router.push({ name: '/user/login' });
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        // Set the max-height of the nested list to its full height
        this.$refs.nestedList.style.maxHeight = `${this.$refs.nestedList.offsetHeight}px`;
    },
};
</script>

