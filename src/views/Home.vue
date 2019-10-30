<template>
    <section class="section">
        <div class="container home">
            <div class="columns">
                <div class="column is-4-desktop is-offset-4-desktop">
                    <h3 class="is-size-3">CloudClipper</h3>
                    <hr class="m-0">
                    <form @submit="()=>false" class="mt-3">
                        <div v-if="!login.usernameChecked" class="field">
                            <div class="control">
                                <input v-model="username" type="text" placeholder="username" class="input">
                            </div>
                        </div>
                        <template v-if="login.usernameChecked && login.showPassword">
                            <div class="field">
                                <div class="control">
                                    <input v-model="login.password" type="password" placeholder="password"
                                           class="input">
                                </div>
                            </div>
                            <LoadingButton :click="checkUsername" class="is-primary">LOGIN</LoadingButton>
                        </template>
                        <template v-if="login.usernameChecked && !login.showPassword">
                            <div class="message">
                                <a @click.prevent="resetUsername" class="is-pulled-right mr-2">change</a>
                                <div class="message-body">
                                    Create a new account with username: <span
                                        class="has-text-success">{{username}}</span>
                                </div>
                            </div>
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
                        <LoadingButton v-else :click="checkUsername" class="is-primary is-fullwidth">Check
                            Username
                        </LoadingButton>
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
                username: 'appdeveloper',
                login: {
                    password: '',
                    showPassword: false,
                    usernameChecked: true
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
                this.login.usernameChecked = false;
                return this.$api.postToRoute('auth.check_username', {
                    username: this.login.username
                }, {
                    yesOrNo: ({exists}) => {
                        this.login.showPassword = exists;
                        this.login.usernameChecked = true;
                        btn.stopLoading();
                    },
                });
            },
            registerUser(btn) {
                return this.$api.postToRoute('auth.register', {
                    username: this.username,
                    password: this.register.password
                }, {
                    any: () => {
                        btn.stopLoading();
                    }
                });
            }
        }
    }
</script>
