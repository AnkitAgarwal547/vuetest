import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        auth: {
            token: "",
            user: {}
        }
    },

    mutations: {
        setToken(state, token) {
            state.auth.token = token;
        },

        setUser(state, user) {
            state.auth.user = user;
        },

        removeAuth(state) {
            state.auth = {
                token: "",
                user: {}
            };
        }
    },

    modules: {}
});
