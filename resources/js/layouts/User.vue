<template>
    <div class="user-layout">
        <Topbar />
        <navigation />
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="content-box">
                        <router-view />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '../components/user/Navbar.vue';
import Topbar from '../components/user/Topbar.vue';

export default {
    name: 'UserLayout',
    components: {
        Navigation,
        Topbar,
    },
    created() {
        this.$store.dispatch('loadUserInfo')
    },
    mounted() {
    },
}
</script>

<style>

</style>
