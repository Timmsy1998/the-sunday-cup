<template>
    <div class="user-layout">
        <Topbar />
        <navigation />
        <router-view />
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
    }
}
</script>

<style>

</style>
