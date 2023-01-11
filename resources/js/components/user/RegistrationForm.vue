<template>
    <div class="container my-5 d-flex aligns-items-center justify-content-center">

        <!-- Form -->
        <form @submit.prevent="handleSubmit(username, email, password, confirmPassword, summonerName, isVerified)"
            class="rounded p-5 visible-form">
            <div class="row">
                <div class="form-group col-12 mb-3">
                    <label for="username">Username</label>
                    <input type="text" v-model="username" class="form-control" id="username" required />
                    <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-12 mb-3">
                    <label for="email">Email</label>
                    <input type="email" v-model="email" class="form-control" id="email" required />
                    <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-12 mb-3">
                    <label for="password">Password</label>
                    <input type="password" v-model="password" class="form-control" id="password" required />
                    <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-12 mb-3">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" v-model="confirmPassword" class="form-control" id="confirm-password"
                        required />
                    <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-12 mb-3">
                    <label for="summoner-name">Summoner Name</label>
                    <input type="text" v-model="summonerName" class="form-control" id="summoner-name" required />
                    <div v-if="errors.summonerName" class="text-danger">{{ errors.summonerName }}</div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-12 mb-3 center-button">
                    <button type="submit" class="btn btn-primary" v-if="isVerified">Submit</button>
                    <button type="button" class="btn btn-secondary" v-if="showVerifyButton" @click="openModal"
                        data-bs-toggle="modal" data-bs-target="#verificationModal">Verify
                        Summoner</button>
                </div>
            </div>
        </form>

        <!-- Modal -->
        <div class="modal fade" data-backdrop="static" data-keyboard="false" id="verificationModal"
            ref="verificationModal" tabindex="-1" role="dialog" v-if="modalOpen">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Verify Summoner</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" v-if="showVerifyButton">
                        <div v-if="errors.verification" class="text-danger mb-3">{{ errors.verification }}</div>
                        <div v-if="!showVerifyButton" class="text-success mb-3">Summoner has been verified! Please click
                            close on this box!</div>
                        <p>To verify your summoner name, please follow these steps:</p>
                        <ol>
                            <li>Go to your League of Legends account settings</li>
                            <li>Change your summoner icon to the one displayed below</li>
                            <li>Click the "Verify" button</li>
                        </ol>
                        <img v-if="summonerIconUrl" :src="summonerIconUrl" class="w-100 mb-3" alt="Summoner Icon" />
                        <div v-if="!summonerIconUrl">Loading summoner icon...</div>

                    </div>
                    <div class="modal-body" v-if="!showVerifyButton">
                        <p>Summoner Has Been Verified Successfully!</p>
                        <p>Summoner Name: {{ summonerName }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="closeModal">Close</button>
                        <button type="button" class="btn btn-primary" v-if="showVerifyButton"
                            @click="verifySummoner">Verify</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
    components: {
    },
    setup() {
        const store = useStore();
        const { state, commit } = useStore();


        // Access store state and actions here
        const modalOpen = computed(() => store.state.modalOpen);
        async function openModal() {
            store.dispatch('openModal');
            await store.dispatch('getRandomSummonerIcon');
        };
        async function closeModal() {
            store.dispatch('closeModal');
            this.$refs.verificationModal.classList.add('hide');

        }

        const errors = computed(() => store.state.errors);
        const regForm = computed(() => store.state.regForm);
        const showVerifyButton = ref(false);
        const isVerified = computed(() => store.state.isVerified);

        const username = ref(state.regForm.username.value || '')
        const password = ref(state.regForm.password.value || '')
        const confirmPassword = ref(state.regForm.confirmPassword.value || '')
        const email = ref(state.regForm.email.value || '')
        const summonerName = ref(state.regForm.summonerName.value || '')
        const rank = ref(state.regForm.rank.value || 'Unranked')

        // Watch Form Fields
        watch(
            username,
            (username) => {
                store.commit('updateUsername', username)
            }
        )

        watch(
            rank,
            (rank) => {
                store.commit('setRank', rank)
            }
        )

        watch(
            email,
            (email) => {
                store.commit('updateEmail', email)
            }
        )

        watch(
            password,
            (password) => {
                store.commit('updatePassword', password)
            }
        )

        watch(
            confirmPassword,
            (confirmPassword) => {
                store.commit('updateconfirmPassword', confirmPassword)
            }
        )

        watch(
            summonerName,
            (summonerName) => {
                if (summonerName.length > 1) {
                    showVerifyButton.value = true
                    store.commit('updatesummonerName', summonerName)
                    console.log(summonerName)
                    console.log("Input Detected")
                } else {
                    showVerifyButton.value = false
                    store.commit('updatesummonerName', summonerName)
                    console.log(summonerName)
                }
            }
        )


        // Call the Functions
        const handleSubmit = async (username, email, password, confirmPassword, summonerName, isVerified, rank) => {
            try {
                // Reset errors
                store.commit('resetErrors');

                console.log(typeof username);
                console.log(typeof email);
                console.log(typeof password);
                console.log(typeof summonerName);
                console.log(typeof isVerified);

                // Validate form
                if (password !== confirmPassword) {
                    store.commit('setError', { field: 'confirmPassword', message: 'Passwords do not match' });
                    console.log('Passwords do not match');
                    return;
                }

                // Sanitize form data
                const data = {
                    username: username.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    summonerName: summonerName.trim(),
                    summoner_verified: isVerified,
                    rank: rank,
                };

                console.log(data.username);
                console.log(data);

                // Send request to server
                await axios.post('/api/register', data);

                // Redirect to login page
                this.$router.push('login');
            } catch (error) {
                if (error.response.status === 422) {
                    store.commit('setErrors', error.response.data.errors);
                }
            }
        };

        // Computed property for the summoner icon URL
        const summonerIconUrl = computed(() => {
            if (!store.state.summonerIcon) return null;
            return `http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${store.state.summonerIcon.id}.png`;
        });


        // Function to verify the summoner name and icon
        const verifySummoner = async () => {
            try {

                const summonerName = await store.state.regForm.summonerName;

                // Get Random Summoner Icon From Store
                const randomIcon = await store.state.summonerIcon.id;


                const response = await axios.get(`/api/summoner/${summonerName}`);
                const summonerData = response.data;

                const rankedinfo = await axios.get(`/api/summoner/${summonerName}/rank`);
                const rankedData = rankedinfo.data[0];
                console.log(rankedData);

                const profileIcon = summonerData.profileIconId;
                const rank = rankedData.tier + ' ' + rankedData.rank;

                store.commit('setRank', rank);

                // Check if summoner icon matches the one stored in the store
                if (profileIcon === randomIcon) {
                    // Set isVerified to true in the store
                    store.commit('setIsVerified', true);
                    console.log(rank);
                    console.log(store.state.regForm.rank);
                    showVerifyButton.value = false;
                } else {
                    // Show error message
                    store.commit('setError', {
                        field: 'verification',
                        message: 'Summoner icon does not match the expected icon. Please try again.'
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        return {
            regForm,
            errors,
            handleSubmit,
            openModal,
            closeModal,
            modalOpen,
            summonerIconUrl,
            verifySummoner,
            isVerified,
            showVerifyButton,
            username,
            password,
            confirmPassword,
            email,
            summonerName,
            rank,

        };
    },

    mounted() {
        this.$bs.modal(this.$el, {
            keyboard: true,
            backdrop: true
        });

    }

};
</script>
