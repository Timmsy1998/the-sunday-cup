<template>
    <div class="register">
        <RegistrationForm />
    </div>

</template>

<script>
import RegistrationForm from '../../components/user/RegistrationForm.vue';
export default {
    name: 'Register',
    data() {
        return {
            pageTitle: 'Register',
        }
    },
    components: {
        RegistrationForm,
    },
}
</script>
