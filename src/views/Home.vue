<template>
    <section class="section">
        <div class="container home">
            <PreLoader v-if="logged===null"/>
            <div v-else-if="logged" class="has-text-success has-text-centered">
                <PreLoader/>
                <h4 class="is-size-4">Logging you in...</h4>
            </div>
            <div v-else class="columns">
                <div :class="css.col4">
                    <h3 class="is-size-3"><i class="fa fa-paste"></i> OwnClipboard</h3>
                    <hr class="m-0">
                    <form @submit="()=>false" class="mt-3">

                        <template v-if="login.usernameChecked">
                            <div class="message">
                                <a @click.prevent="resetUsername" class="is-pulled-right mr-2">change</a>
                                <div class="message-body">
                                    <template v-if="login.userExists">Sign in to account with username:</template>
                                    <template v-else>Create a new account with username:</template>
                                    <strong class="has-text-success"> {{username.toLowerCase()}}</strong>
                                </div>
                            </div>
                            <template v-if="login.userExists">
                                <div class="field">
                                    <div class="control">
                                        <input v-model="login.password" type="password" placeholder="password"
                                               class="input">
                                    </div>
                                </div>
                                <LoadingButton :click="loginUser" class="is-success is-fullwidth">LOGIN
                                </LoadingButton>
                            </template>
                            <template v-else>
                                <div class="field">
                                    <label class="label">Password</label>
                                    <div class="control">
                                        <input v-model="register.password" type="password" placeholder="password"
                                               class="input">
                                    </div>
                                    <p class="help">
                                        Password to access your account with. <br> (Min: 4 characters)
                                    </p>
                                </div>
                                <LoadingButton :click="registerUser" class="is-warning is-fullwidth">
                                    CREATE ACCOUNT
                                </LoadingButton>
                            </template>

                        </template>
                        <template v-else>
                            <div class="field">
                                <div class="control">
                                    <input v-model="username" type="text" placeholder="username" class="input">
                                </div>
                            </div>
                            <LoadingButton :click="checkUsername" class="is-primary is-fullwidth">CHECK
                                USERNAME
                            </LoadingButton>
                        </template>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
    .home {
        margin-top: 15vh;
    }
</style>

<script>
    // @ is an alias to /src

    import {mapState} from "vuex";

    export default {
        name: 'home',
        data() {
            return {
                username: '',
                login: {
                    password: '',
                    userExists: false,
                    usernameChecked: false
                },

                register: {
                    password: ''
                }
            };
        },

        watch: {
            logged() {
                if (this.logged) {
                    setTimeout(() => {
                        return this.$router.push({name: 'clipboard'});
                    }, 1000);
                }
            }
        },

        computed: {
            ...mapState(['logged', 'css']),
            hasUsername() {
                const username = this.$route.query.username;
                return !!(username && username.length);
            }
        },

        mounted() {
            if (this.hasUsername)
                this.username = this.$route.query.username;
        },

        methods: {
            resetUsername() {
                this.login.usernameChecked = false;
                this.login.userExists = false;
            },
            checkUsername(btn) {
                if (!this.username.length) return btn.stopLoading();

                this.login.usernameChecked = false;
                return this.$api.postToRoute('auth.check_username', {
                    username: this.username
                }, {
                    yes: ({exists}) => {
                        this.login.userExists = exists;
                        this.login.usernameChecked = true;
                        this.login.password = "";
                        this.register.password = "";
                        btn.stopLoading();
                    },

                    no: ({exists}) => {
                        this.login.userExists = exists;
                        this.login.usernameChecked = false;
                        btn.stopLoading();
                    }
                });
            },
            registerUser(btn) {
                const password = this.register.password;
                if (!password) return btn.stopLoading();

                return this.$api.postToRoute('auth.register', {
                    username: this.username,
                    password: this.register.password
                }, {
                    yes: () => this.login.userExists = true,
                    any: () => {
                        btn.stopLoading();
                    }
                });
            },
            loginUser(btn) {
                const password = this.login.password;
                if (!password) return btn.stopLoading();

                return this.$api.postToRoute('auth.login', {
                    username: this.username,
                    password,
                }, {
                    yes: ({user}) => {
                        this.$store.commit('setLogged', true);
                        this.$store.commit('setUser', user);

                        this.resetUsername();
                        return this.$router.push({name: 'clipboard'})
                    },
                    any: () => btn.stopLoading()
                });
            }
        }
    }
</script>
