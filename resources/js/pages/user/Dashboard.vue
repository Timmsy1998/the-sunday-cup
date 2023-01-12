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
                            <table class="table table-striped">
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
                            <ul class="list-group">
                                <li class="list-group-item" v-for="notification in recentNotifications"
                                    :key="notification.id">{{ notification.message }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <h1 class="display-4">Welcome to The Sunday Cup!</h1>
                            <p class="lead">
                                We're glad you're here! This is your dashboard where you can view important information
                                and statistics about your account.
                            </p>
                            <hr class="my-4">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <i class="fas fa-chart-line"></i> Infographic 1
                        </div>
                        <div class="card-body">
                            <!-- Content for infographic 1 goes here -->
                            <canvas id="infographic1"></canvas>
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
        }
    },
    components: {
    },
    computed: {
        ...mapGetters(['username', 'summonerName', 'rank', 'isLoggedIn', 'token']),
    },
    mounted() {
    },
}
</script>
