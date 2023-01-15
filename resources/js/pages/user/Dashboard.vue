<template>
    <div class="dashboard">
        <div class="container-fluid" style="padding: 1rem;">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-calendar-alt"></i> Upcoming Events
                        </div>
                        <div class="card-body">
                            <!-- Upcoming events data goes here -->
                            <table class="table table-striped" v-if="recentNotifications.length">
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="event in upcomingEvents" :key="event.id">
                                        <td>{{ event.name }}</td>
                                        <td>{{ event.date }}</td>
                                        <td>{{ event.time }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-else class="text-center">
                                No Upcoming Events
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-envelope"></i> Recent Notifications
                        </div>
                        <div class="card-body">
                            <!-- Recent notifications data goes here -->
                            <ul class="list-group" v-if="recentNotifications.length">
                                <li class="list-group-item" v-for="notification in recentNotifications"
                                    :key="notification.id">{{ notification.message }}</li>
                            </ul>
                            <div v-else class="text-center">
                                No notifications found
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <h1 class="display-4">Welcome to The Sunday Cup!</h1>
                            <p class="lead">
                                We're glad you're here! This is your dashboard where you can view important information
                                and statistics about your account.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-chart-line"></i> Your Current Rank
                        </div>
                        <div class="card-body align-items-center justify-content-center text-center">
                            <img class="img-fluid w-75"
                                :src="'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/' + rankTier + '.png'" />
                            <br />
                            <p class="lead">
                                {{ rank }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-chart-line"></i> Infographic 2
                        </div>
                        <div class="card-body">
                            <!-- Content for infographic 2 goes here -->
                            <canvas id="infographic2"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-chart-line"></i> Infographic 3
                        </div>
                        <div class="card-body">
                            <!-- Content for infographic 3 goes here -->
                            <canvas id="infographic3"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Dashboard',
    data() {
        return {
            pageTitle: 'Dashboard',
            upcomingEvents: [],
            recentNotifications: [],
            recentActivity: [],
            rankTier: '',
        }
    },
    methods: {
        async getRankIcon() {
            try {
                const response = await axios.get(`/api/summoner/${this.summonerName}/rank`)
                let tier = "unranked"
                if (response.data[0].tier) {
                    tier = response.data[0].tier
                    tier = tier.toLowerCase();
                }
                this.rankTier = tier
            } catch (error) {
                console.error(error)
            }
        },
    },
    created() {
        this.getRankIcon()
    },
    computed: {
        ...mapGetters(['username', 'summonerName', 'rank', 'isLoggedIn', 'token']),
    },
    mounted() {
    },
}
</script>
