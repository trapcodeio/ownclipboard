<template>
    <section class="section">
        <div class="container home">
            <div class="columns">
                <div class="column is-4-desktop is-offset-4-desktop">
                    <h3 class="is-size-3">Sign In</h3>
                    <!--                    <hr class="m-0">-->
                    <form @submit="()=>false">
                        <div class="field">
                            <div class="control">
                                <input v-model="login.username" type="text" placeholder="username" class="input">
                            </div>
                        </div>
                        <div v-if="login.showPassword" class="field">
                            <div class="control">
                                <input v-model="login.password" type="password" placeholder="password" class="input">
                            </div>
                        </div>
                        <button @click.prevent="checkUsername" class="button is-primary">
                            Check Username
                        </button>
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
                login: {
                    username: '',
                    password: '',
                    showPassword: false,
                }
            };
        },

        methods: {
            checkUsername() {
                this.login.showPassword = true;
            }
        }
    }
</script>
