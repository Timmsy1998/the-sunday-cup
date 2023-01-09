<template>
    <div class="landing-page">
        <div class="container h-100 d-flex align-items-center">
            <div class="row w-100">
                <div class="col-12 text-center">
                    <h1 class="display-4 font-weight-bold">Welcome to The Sunday Cup</h1>
                    <p class="gold-text large-text text-shadow">
                        Join us every Sunday for a chance to compete against fellow lower ranked players and prove your
                        skills on the virtual battlefield!
                    </p>
                    <div class="btn-group d-flex flex-column align-items-center" role="group">
                        <button class="btn btn-primary btn-lg rounded" @click="signUp">Sign Up</button>
                        <button class="btn btn-primary btn-lg rounded" @click="learnMore">Learn More</button>
                        <button class="btn btn-primary btn-lg rounded" @click="viewTournament">View Current
                            Tournament</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Landing",
    data() {
        return {};
    },
    methods: {
        signUp() {
            // handle sign up button click
        },
        learnMore() {
            this.$router.push('/home')
        },
        viewTournament() {
            // handle view tournament button click
        },
    },
};
</script>
