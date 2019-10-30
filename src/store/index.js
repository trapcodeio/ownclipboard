import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        logged: null,
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setLogged(state, logged) {
            state.logged = logged;
        }
    },
    actions: {},
    modules: {}
})
