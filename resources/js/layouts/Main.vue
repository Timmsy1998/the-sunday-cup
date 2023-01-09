<template>
    <div class="main-layout">
        <div class="container-fluid p-5">
            <navigation />
            <header-hero />
        </div>
        <router-view />
    </div>
</template>

<script>
import Navigation from '../components/main/Navbar.vue'
import HeaderHero from '../components/main/Header.vue'

export default {
    name: 'MainLayout',
    components: {
        Navigation,
        HeaderHero
    }
}
</script>

<style>

</style>
