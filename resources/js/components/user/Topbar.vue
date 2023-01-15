<template>
    <nav class="navbar navbar-expand-lg topbar">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <!-- Add navigation links here -->
            </ul>
            <ul class="navbar-nav ms-auto" style="padding: 1rem;">
                <li class="nav-item">
                    <span class="nav-link" style="margin-top: 1rem;" v-if="logincheck">Hi There, {{
                        this.username
                    }}!</span>
                    <span class="nav-link" style="margin-top: 1rem;" v-else>Welcome Summoner!</span>
                </li>
                <li class="nav-item">
                    <img :src="'https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/' + summonerIconID + '.png'" class="nav-link img-circle" alt="Avatar"
                        v-if="logincheck">
                    <img src="../../../images/avatar-placeholder.png" class="nav-link img-circle" alt="Avatar" v-else>
                </li>
            </ul>

        </div>
    </nav>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            summonerIconID: '',
        };
    },
    methods: {
        async getIconID() {
            try {
                const response = await axios.get(`/api/summoner/${this.summonerName}`)
                this.summonerIconID = response.data.profileIconId
            } catch (error) {
                console.error(error)
            }
        },
    },
    created() {
        this.getIconID()
    },
    computed: {
        ...mapGetters(['username', 'summonerName', 'rank', 'isLoggedIn', 'token']),

        logincheck() {
            // Check the session status in the Vuex store
            console.log("User is logged in: ", this.isLoggedIn)
            return this.isLoggedIn
        },
    },
};
</script>
