<template>
        <nav class="navbar navbar-expand-lg topbar">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <!-- Add navigation links here -->
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <span class="nav-link" style="margin-top: 1rem;" v-if="isLoggedIn">Hi There, {{
                            this.username
                        }}!</span>
                        <span class="nav-link" style="margin-top: 1rem;" v-else>Welcome Summoner!</span>
                    </li>
                    <li class="nav-item">
                        <img src="../../../images/avatar-placeholder.png" class="nav-link img-circle" alt="Avatar">
                    </li>
                </ul>

            </div>
        </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
        };
    },
    methods: {
    },
    mounted() {
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
