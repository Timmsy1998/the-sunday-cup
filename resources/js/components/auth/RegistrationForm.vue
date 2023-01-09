<template>
    <!-- Modal -->
    <div v-if="showModal">
        <div class="modal" tabindex="-1" role="dialog" id="verificationModal" ref="verificationModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Verify Summoner Account</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"
                            @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <p>Please change your summoner account icon to the following image:</p>
                        <div class="summoner-icon-container">
                            <img :src="'http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/' + randomIcon + '.png'"
                                alt="Random Summoner Icon" class="summoner-icon">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="verifySummoner">Verify</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click="closeModal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Form -->
    <div>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input v-model="form.username" type="text" class="form-control" id="username"
                    aria-describedby="usernameHelp" placeholder="Enter username" />
                <div v-if="errors.username" class="invalid-feedback">{{ errors.username[0] }}</div>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="form.password" type="password" class="form-control" id="password"
                    placeholder="Enter password" />
                <div v-if="errors.password" class="invalid-feedback">{{ errors.password[0] }}</div>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="form.email" type="email" class="form-control" id="email" aria-describedby="emailHelp"
                    placeholder="Enter email" />
                <div v-if="errors.email" class="invalid-feedback">{{ errors.email[0] }}</div>
            </div>
            <div class="form-group">
                <label for="summoner_name">Summoner Name</label>
                <input v-model="form.summoner_name" type="text" class="form-control" id="summoner_name"
                    placeholder="Enter summoner name" />
                <div v-if="errors.summoner_name" class="invalid-feedback">{{ errors.summoner_name[0] }}</div>
            </div>
            <button type="submit" v-if="form.summoner_verified" class="btn btn-primary">Submit</button>
        </form>
        <button v-if="!form.summoner_verified && showVerifyButton" @click="openModal" data-bs-toggle="modal"
            data-bs-target="#verificationModal" class="btn btn-secondary">Verify Summoner</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                email: '',
                summoner_name: '',
                summoner_verified: false,
                rank: '',
            },
            errors: {},
            showModal: false,
            randomIcon: '',
        };
    },
    computed: {
        showVerifyButton() {
            return this.form.summoner_name.length > 0
        },
    },
    methods: {
        openModal() {
            this.showModal = true;
            console.log("Model Opened");
            console.log(this.showModal);
        },
        closeModal() {
            this.showModal = false;
            console.log("Model Closed");
            console.log(this.showModal);
        },
        submitForm() {
            axios.post('/api/register', this.form)
                .then(response => {
                    // redirect to dashboard or display success message
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                });
        },
        verifySummoner() {
            axios.post('/api/verify-summoner', {
                summoner_name: this.summonerName
            })
                .then(response => {
                    if (response.data.summoner_verified) {
                        this.summonerVerified = true;
                        this.rank = response.data.rank;
                        this.showModal = false;
                    } else {
                        this.summonerVerified = false;
                        this.showModal = true;
                    }
                    this.randomIcon = response.data.random_icon;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
};
</script>

