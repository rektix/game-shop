import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        games: []
    },

    mutations: {
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
        }
    },

    actions: {
        load_games: function({ commit }) {
            fetch('http://localhost/api/games', { method: 'get' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('set_games', jsonData)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        delete_game: function({ commit }, id) {
            fetch(`http://localhost/api/games/${id}`, { method: 'delete' }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json()
            }).then((jsonData) => {
                commit('remove_game', jsonData.id)
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        new_game: function({ commit }, game) {
            fetch('http://localhost/api/games', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: game
            }).then((response) => {
                if (!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {
                commit('add_game', jsonData);
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        },

        change_game: function({ commit }, payload) {
            console.log(payload)
            fetch(`http://localhost/api/games/${payload.id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: payload.msg
            }).then((response) => {
                console.log(response)
                if (!response.ok)
                    throw response;

                return response.json();
            }).then((jsonData) => {
                commit('update_game', { id: payload.id, msg: jsonData });
            }).catch((error) => {
                if (typeof error.text === 'function')
                    error.text().then((errorMessage) => {
                        alert(errorMessage);
                    });
                else
                    alert(error);
            });
        }
    }
})