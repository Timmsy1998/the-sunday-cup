<template>
    <nav class="navbar navbar-expand-lg topbar">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <!-- Add navigation links here -->
            </ul>
            <ul class="navbar-nav ms-auto" v-if="isLoggedIn">
                <li class="nav-item" >
                    <span class="nav-link" style="margin-top: 1rem;">Hi There, Username</span>
                </li>
                <li class="nav-item">
                    <img src="../../../images/avatar-placeholder.png" class="nav-link img-circle" alt="Avatar">
                </li>
            </ul>

        </div>
    </nav>
</template>

<script>
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
        isLoggedIn() {
            // Check the session status in the Vuex store
            return this.$store.state.isLoggedIn;
        },
    },
};
</script>
