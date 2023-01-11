import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        modalOpen: false,
        regForm: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            summonerName: '',
            rank: '',
        },
        errors: {},
        summonerIcon: '',
        isVerified: false,
        data: null,
        isLoggedIn: false,
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
        setIsLoggedIn(state, value) {
            state.isLoggedIn = value
        },
    },
    actions: {
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
        paths: ['isLoggedIn'],
    })]
});
