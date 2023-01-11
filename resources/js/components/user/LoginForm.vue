<template>
    <div class="container my-5 d-flex aligns-items-center justify-content-center">
        <form>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div v-if="success" class="alert alert-success">{{ success }}</div>
            <div v-if="success && timer > 0" class="alert alert-info">Redirecting in {{ timer }} seconds</div>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="submit">Log In</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            error: '',
            success: '',
            timer: 5,
        }
    },
    methods: {
        async submit() {
            this.error = '';
            this.success = '';
            const { username, password } = this
            try {
                await axios.post('/api/login', { username, password }).then(response => {
                    if (response.data.success) {
                        // Update the Vuex store to set the user's logged-in state to true
                        this.$store.commit('setIsLoggedIn', true);
                        // Store the session data in the Vuex store
                        this.$store.commit('setSession', response.data.session);

                        // Show success message and then do a count-down push to allow the API to catch up
                        this.success = 'Successfully logged in';
                        setTimeout(() => {
                            const interval = setInterval(() => {
                                this.timer--;
                                if (this.timer === 0) {
                                    clearInterval(interval);
                                    this.$router.push('/user/dashboard')
                                }
                            }, 1000);
                        }, 5000);
                    } else {
                        this.error = 'Invalid username or password';
                    }
                })

            } catch (error) {
                this.error = error;
            }
        }
    }
}
</script>
