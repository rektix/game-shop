import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        games: [],
        token: '',
        user: {}
    },
    getters: {
        isLoggedIn: state => {
            return state.token;
        },
        isAdmin: state => {
            return state.user.name == 'admin';
        }
    },

    mutations: {
        set_token: function(state, token) {
            state.token = token;
        },

        set_user: function(state, user) {
            state.user = user;
        },

        set_games: function(state, games) {
            state.games = games;
        },

        add_game: function(state, game) {
            state.games.push(game);
        },

        remove_game: function(state, id) {
            for (let m = 0; m < state.games.length; m++) {
                if (state.games[m].id === id) {
                    state.games.splice(m, 1);
                    break;
                }
            }
        },

        update_game: function(state, payload) {
            for (let m = 0; m < state.games.length; m++) {
                if (state.games[m].id === parseInt(payload.id)) {
                    state.games[m].name = payload.msg.name;
                    state.games[m].genre = payload.msg.genre;
                    state.games[m].score = payload.msg.score;
                    state.games[m].description = payload.msg.description;
                    state.games[m].price = payload.msg.price;
                    break;
                }
            }
        },

        reset: function(state) {
            state.token = '';
            state.games = [];
            state.user = {};
        }
    },

    actions: {
        get_user: function({ commit }) {
            axios.get('http://localhost/api/user/list')
                .then((response) => {
                    if (response.status != 200)
                        throw response;
                    return response.data;
                })
                .then((jsonData) => {
                    commit('set_user', jsonData);
                })
        },

        logout: ({ commit }) => {
            commit('reset', '');
        },
        register: function({ commit }, user) {
            console.log(commit)
            axios.post('http://localhost/api/auth/register', user, { headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    if (response.status != 200)
                        throw response;
                    return response.data;
                })
                .catch((error) => {
                    if (typeof error.text === 'function')
                        error.text().then((errorMessage) => {
                            alert(errorMessage);
                        });
                    else
                        alert(error.response.data.msg);
                })
        },
        login: function({ commit }, user) {
            axios.post('http://localhost/api/auth/login', user, { headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    if (response.status != 200)
                        throw response;
                    return response.data;
                })
                .then((jsonData) => {
                    commit('set_token', jsonData.token);
                    console.log(axios.defaults.headers.common)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${jsonData.token}`;
                    console.log(axios.defaults.headers.common)
                }).catch((error) => {
                    if (typeof error.text === 'function')
                        error.text().then((errorMessage) => {
                            alert(errorMessage);
                        });
                    else
                        alert(error.response.data.msg);
                });
        },

        buy_game: function({ commit }, id) {
            console.log(commit)
            axios.post(`http://localhost/api/games/buy/${id}`)
                .then((response) => {
                    if (response.status != 200)
                        throw response;

                }).catch((error) => {
                    if (typeof error.text === 'function')
                        error.text().then((errorMessage) => {
                            alert(errorMessage);
                        });
                    else
                        alert(error.response.data.msg);
                });
        },

        load_games: function({ commit }) {
            axios.get('http://localhost/api/games').then((response) => {
                if (response.status != 200)
                    throw response;

                return response.data;
            }).then((jsonData) => {
                console.log(jsonData)
                commit('set_games', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error.response.data.msg);
            });
        },

        delete_game: function({ commit }, id) {
            axios.delete(`http://localhost/api/games/${id}`).then((response) => {
                if (response.status != 200)
                    throw response;

                return response.data
            }).then((jsonData) => {
                commit('remove_game', jsonData.id)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error.response.data.msg);
            });
        },

        new_game: function({ commit }, game) {
            axios.post('http://localhost/api/games', game, { headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    if (response.status != 200)
                        throw response;

                    return response.data;
                }).then((jsonData) => {
                    commit('add_game', jsonData);
                }).catch((error) => {
                    if (typeof error.text === 'function')
                        error.text().then((errorMessage) => {
                            alert(errorMessage);
                        });
                    else
                        alert(error.response.data.msg);
                });
        },

        change_game: function({ commit }, payload) {
            axios.put(`http://localhost/api/games/${payload.id}`, payload.msg, { headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    if (response.status != 200)
                        throw response;

                    return response.data;
                }).then((jsonData) => {
                    commit('update_game', { id: payload.id, msg: jsonData });
                }).catch((error) => {
                    if (typeof error.text === 'function')
                        error.text().then((errorMessage) => {
                            alert(errorMessage);
                        });
                    else
                        alert(error.response.data.msg);
                });
        }
    }
})