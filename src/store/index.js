import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        logged: null,
        user: null,
        css: {
            col4: 'column is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop is-4-widescreen is-offset-4-widescreen'
        }
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
