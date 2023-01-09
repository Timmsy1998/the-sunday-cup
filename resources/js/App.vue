<template>
    <div>
        <component :is="$route.meta.layout" />
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import LandingLayout from '@/layouts/Landing.vue'
import MainLayout from '@/layouts/Main.vue'

export default {
    components: {
        LandingLayout,
        MainLayout,
    },
    setup() {
        const route = useRoute()

        return {
            route
        }
    }
}
</script>
