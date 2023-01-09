<template>
    <form @submit.prevent="signUp">
        <!-- Form fields here -->
        <button type="submit">Sign up</button>
    </form>
</template>

<script>
export default {
    name: 'SignUpForm',
    methods: {
        signUp() {
            // Call the signUp action in the store with the form data
            this.$store.dispatch('signUp', this.formData);
        },
    },
    computed: {
        formData() {
            // Return the form data object
        },
    },
};
</script>
