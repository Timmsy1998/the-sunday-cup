<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent fixed-top"
        v-bind:class="{ 'bg-purple': isScrolled, 'shadow-sm': isScrolled }">
        <div class="container">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item" v-for="(link, index) in links" v-bind:key="index">
                    <router-link class="nav-link text-gold"
                        v-bind:class="{ 'font-weight-bold': isActive(link.path), 'text-gold': !isActive(link.path) }"
                        v-bind:to="link.path"
                        v-bind:style="{ 'font-size': isActive(link.path) ? '1.2rem' : '1rem', 'transition': !isActive(link.path) ? 'font-size 0.2s' : '' }"
                        v-on:mouseover="lightenText" v-on:mouseout="resetText">{{
    link.name
                        }}</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Navbar',
    data() {
        return {
            links: [
                { name: 'Home', path: '/home' },
                { name: 'About', path: '/about' },
                { name: 'Hall of Fame', path: '/hall-of-fame' },
                { name: 'Contact', path: '/contact' }
            ],
            scrollPos: 0,
            isHover: false
        }
    },
    computed: {
        ...mapState(['isScrolled'])
    },
    methods: {
        isActive(path) {
            return this.$route.path === path
        },
        lightenText(event) {
            this.isHover = true
            event.target.style.color = 'lighten($text-gold, 10%)'
            event.target.style.fontSize = '1.2rem'
        },
        resetText(event) {
            this.isHover = false
            if (!this.isActive(event.target.getAttribute('to'))) {
                event.target.style.color = '$text-gold'
                event.target.style.fontSize = '1rem'
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            console.log('scroll event fired')
            this.scrollPos = window.scrollY
            this.isScrolled = this.scrollPos > 0
        })
    }
}
</script>
