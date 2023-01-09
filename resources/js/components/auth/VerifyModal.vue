<template>
    <div>
        <!-- Modal content here -->
        <form @submit.prevent="verifySummoner">
            <!-- Form fields here -->
            <button type="submit">Verify</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'VerifyModal',
    methods: {
        verifySummoner() {
            // Call the verifySummoner action in the store with the form data
            this.$store.dispatch('verifySummoner', this.formData);
        },
    },
    computed: {
        formData() {
            // Return the form data object
        },
    },
};
</script>
