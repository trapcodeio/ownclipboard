export default {
    data() {
        return {
            loaded: true,
        }
    },

    mounted() {
        this.getAuth();
    },

    methods: {
        getAuth() {
            return this.$api.getFromRoute('auth', {}, {
                yes: ({user, logged}) => {
                    this.$store.commit('setUser', user);
                    this.$store.commit('setLogged', logged);
                },
                any: () => this.loaded = true,
            });
        }
    }
}
