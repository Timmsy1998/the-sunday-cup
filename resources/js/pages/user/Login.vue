<template>
    <div class="login">
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '../../components/user/LoginForm.vue';
export default {
    name: 'Login',
    data() {
        return {
            pageTitle: 'Login',
        }
    },
    components: {
        LoginForm,
    },
}
</script>
