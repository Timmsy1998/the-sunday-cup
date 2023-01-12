<template>
        <nav class="navigation d-flex flex-column position-fixed h-100 w-15 top-0" :aria-expanded="isExpanded">
            <!-- Logo -->
            <div class="logo p-3 d-flex justify-content-center align-items-center">
                <img src="../../../images/Logo-No-BG.png" alt="Logo">
            </div>

            <!-- Sidebar items -->
            <ul class="navbar-nav flex-column">
                <li class="nav-item" v-if="isLoggedIn">
                    <a class="nav-link d-flex" href="#" @click="isHomeExpanded = !isHomeExpanded">
                        <i class="fas fa-home"></i>
                        <span class="d-none d-md-flex">Home</span>
                    </a>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <a class="nav-link d-flex" href="#" @click="$router.push('/user/login')">
                        <i class="fas fa-sign-in-alt"></i>
                        <span class="d-none d-md-flex">Login</span>
                    </a>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <a class="nav-link d-flex" href="#" @click="$router.push('/user/register')">
                        <i class="fas fa-user-plus"></i>
                        <span class="d-none d-md-flex">Register</span>
                    </a>
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
            isHomeExpanded: false,
        };
    },
    methods: {
        toggleSidebar() {
            this.isExpanded = !this.isExpanded;
        },
    },
    mounted() {
        // Set the max-height of the nested list to its full height
        this.$refs.nestedList.style.maxHeight = `${this.$refs.nestedList.offsetHeight}px`;
        console.log(this.isLoggedIn)
        console.log(this.username)
        console.log(this.summonerName)
        console.log(this.rank)
    },
    computed: {
        ...mapGetters(['username', 'summonerName', 'rank', 'isLoggedIn', 'token']),
        isLoggedIn() {
            // Check the session status in the Vuex store
            return this.$store.state.userinfo.isLoggedIn
        },
        dataLoaded() {
            return this.isLoggedIn
        }
    },
};
</script>
