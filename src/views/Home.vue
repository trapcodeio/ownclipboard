<template>
    <section class="section">
        <div class="container home">
            <div class="columns">
                <div class="column is-4-desktop is-offset-4-desktop">
                    <h3 class="is-size-3">CloudClipper</h3>
                    <hr class="m-0">
                    <form @submit="()=>false" class="mt-3">

                        <template v-if="login.usernameChecked">
                            <div class="message">
                                <a @click.prevent="resetUsername" class="is-pulled-right mr-2">change</a>
                                <div class="message-body">
                                    <template v-if="login.showPassword">Sign in to account with username:</template>
                                    <template v-else>Create a new account with username:</template>
                                    <span class="has-text-success"> {{username}}</span>
                                </div>
                            </div>
                            <template v-if="login.showPassword">
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
                                <LoadingButton :click="registerUser" class="is-success is-fullwidth">
                                    REGISTER
                                </LoadingButton>
                            </template>

                        </template>
                        <template v-else>
                            <div class="field">
                                <div class="control">
                                    <input v-model="username" type="text" placeholder="username" class="input">
                                </div>
                            </div>
                            <LoadingButton :click="checkUsername" class="is-primary is-fullwidth">Check
                                Username
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

    export default {
        name: 'home',
        data() {
            return {
                username: '',
                login: {
                    password: '',
                    showPassword: false,
                    usernameChecked: false
                },

                register: {
                    password: ''
                }
            };
        },

        methods: {
            resetUsername() {
                this.login.usernameChecked = false;
                this.login.showPassword = false;
            },
            checkUsername(btn) {
                if (!this.username.length) return btn.stopLoading();

                this.login.usernameChecked = false;
                return this.$api.postToRoute('auth.check_username', {
                    username: this.username
                }, {
                    yes: ({exists}) => {
                        this.login.showPassword = exists;
                        this.login.usernameChecked = true;
                        this.login.password = "";
                        this.register.password = "";
                        btn.stopLoading();
                    },

                    no: ({exists}) => {
                        this.login.showPassword = exists;
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
                    yes: () => this.resetUsername(),
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
                    yes: () => this.resetUsername(),
                    any: () => {
                        btn.stopLoading();
                    }
                });
            }
        }
    }
</script>
