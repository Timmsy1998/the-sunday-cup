import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        modalOpen: false,
        errors: {},
        summonerIcon: '',
        isVerified: false,
        data: null,
        userinfo: {
            username: '',
            summonerName: '',
            rank: '',
            role: '',
            isLoggedIn: false,
            token: '',
        },
        regForm: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            summonerName: '',
            rank: '',
        },
    },
    getters: {
        username: state => state.userinfo.username,
        summonerName: state => state.userinfo.summonerName,
        rank: state => state.userinfo.rank,
        role: state => state.userinfo.role,
        isLoggedIn: state => state.userinfo.isLoggedIn,
        token: state => state.userinfo.token,
    },
    mutations: {
        openModal(state) {
            state.modalOpen = true;
        },
        closeModal(state) {
            state.modalOpen = false;
        },
        resetErrors(state) {
            state.errors = {};
        },
        setError(state, { field, message }) {
            state.errors = {
                ...state.errors,
                [field]: message,
            };
        },
        setErrors(state, errors) {
            state.errors = errors;
        },
        setFormField(state, { field, value }) {
            state.regForm = {
                ...state.regForm,
                [field]: value,
            };
        },
        setIsVerified(state, value) {
            state.isVerified = value;
        },
        setData(state, data) {
            state.data = data;
        },
        setSummonerIcon(state, summonerIcon) {
            state.summonerIcon = summonerIcon;
        },
        setRank(state, rank) {
            state.regForm.rank = rank;
        },
        updateRegForm(state, payload) {
            state.regForm[payload.field] = payload.value
        },
        updateUsername(state, payload) {
            state.regForm.username = payload
        },
        updatePassword(state, payload) {
            state.regForm.password = payload
        },
        updateconfirmPassword(state, payload) {
            state.regForm.confirmPassword = payload
        },
        updateEmail(state, payload) {
            state.regForm.email = payload
        },
        updatesummonerName(state, payload) {
            state.regForm.summonerName = payload
        },
        setSession(state, data) {
            state.userinfo.username = data.username
            state.userinfo.rank = data.rank
            state.userinfo.summonerName = data.summonerName
            state.userinfo.token = data.token
            state.userinfo.isLoggedIn = data.isLoggedIn
            state.userinfo.role = data.role
            console.log(state.userinfo)
        },
        clearUserData(state) {
            state.userinfo.username = '';
            state.userinfo.rank = '';
            state.userinfo.summonerName = '';
            state.userinfo.token = '';
            state.userinfo.isLoggedIn = false;
            state.userinfo.role = data.role
        },

    },
    actions: {
        loadUserInfo({ commit }) {
            // Use axios or any other library to send a request to your server
            // to fetch the user's data
            axios.get('/api/userinfo')
                .then(({ data }) => {
                    console.log(data);
                    commit('setSession', data)
                })
        },
        checkSession({ commit }) {
            axios.get('/api/check-session')
                .then(({ data }) => {
                    if (data.sessionFound) {
                        commit('setIsLoggedIn', true);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        openModal({ commit }) {
            commit('openModal');
        },
        closeModal({ commit }) {
            commit('closeModal');
        },
        updateFormField({ commit }, { field, value }) {
            commit('setFormField', { field, value });
        },
        updateError({ commit }, { field, value }) {
            commit('setError', { field, value });
        },
        setUsername({ commit }, username) {
            commit('SET_USERNAME', username)
        },
        setSummonerName({ commit }, summonerName) {
            commit('SET_SUMMONER', summonerName)
        },
        setRank({ commit }, rank) {
            commit('SET_RANK', rank)
        },
        async getRandomSummonerIcon({ commit }) {
            try {
                const response = await axios.get('/api/summoner-icons/random');
                const summonerIcon = response.data;
                commit('setSummonerIcon', summonerIcon);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchSummonerRank({ commit }, summonerName) {
            try {
                const response = await axios.get(`/summoner/${summonerName}/rank`);
                commit('setRank', response.data);
            } catch (error) {
                console.error(error);
            }
        },
    },
    plugins: [createPersistedState({
        paths: [
            'userinfo'
        ],
    })]
});
