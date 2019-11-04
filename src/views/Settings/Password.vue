<template>
    <section class="section">
        <div class="container mb-5">
            <div class="has-text-centered mb-5">
                <i class="fad fa-key fa-4x"></i>
                <h3 class="is-size-3 my-2">Change Password</h3>
            </div>

            <div class="columns">
                <div :class="css.col4">
                    <div class="box">
                        <form action="">
                            <div class="field">
                                <label for="" class="label">Old Password</label>
                                <div class="control">
                                    <input v-model="form.current" type="password" class="input"
                                           placeholder="Old Password">
                                </div>
                            </div>

                            <div class="field">
                                <label for="" class="label">New Password</label>
                                <div class="control">
                                    <input v-model="form.password" type="password" class="input"
                                           placeholder="New Password">
                                </div>
                            </div>

                            <div class="field">
                                <label for="" class="label">Confirm Password</label>
                                <div class="control">
                                    <input v-model="form.confirm" type="password" class="input"
                                           placeholder="Confirm Password">
                                </div>
                            </div>

                            <LoadingButton :click="changePassword" class="is-warning is-fullwidth mt-3">Change
                                Password
                            </LoadingButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        data() {
            return {
                form: {
                    current: '12345',
                    password: '123456',
                    confirm: '123456'
                }
            }
        },

        computed: {
            ...mapState(['css', 'user'])
        },

        methods: {
            error(text, btn = undefined) {
                if (btn) btn.stopLoading();

                return Swal.fire({
                    type: 'error',
                    text
                })
            },
            changePassword(btn) {
                // Check for empty fields
                const {current, password, confirm} = this.form;

                for (const item of [current, password, confirm]) {
                    if (!item.length) {
                        return this.error('Fill all fields.', btn);
                    }
                }

                if (current === password) {
                    return this.error(`New password and old password cannot be the same.`, btn)
                }

                if (password !== confirm) {
                    return this.error(`Confirm password does not match new password.`, btn)
                }

                return this.$api.postToRoute('auth.change_password', {current, password}, {
                    yes: () => {
                        this.$router.push({name: 'index', query: {username: this.user.username}});
                        this.$store.commit('setLogged', false);
                        this.$store.commit('setUser', null);
                    },
                    any: () => {
                        return btn.stopLoading();
                    }
                })
            }
        }
    }
</script>
