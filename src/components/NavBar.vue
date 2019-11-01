<template>
    <nav class="navbar is-dark">
        <div class="navbar-brand">
            <router-link :to="{name: 'clipboard'}" class="navbar-item">
                <h3 class="is-size-4"><i class="far fa-paste"></i> CloudClipBoard</h3>
            </router-link>
            <div @click.prevent="toggleMenu" :class="burgerClass" data-target="authNavMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="authNavMenu" :class="mainClass">
            <div class="navbar-end mr-5 has-icon-left">
                <router-link :to="{name: 'clipboard'}" class="navbar-item">
                    <i class="far fa-clipboard"></i> History
                </router-link>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        <i class="fa fa-user"></i> Account
                    </a>
                    <div class="navbar-dropdown is-boxed">
                        <router-link class="navbar-item" :to="rl('devices')">
                            <i class="fa fa-mobile"></i> Devices
                        </router-link>
                        <!--<a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                            <i class="far fa-cog"></i> Settings
                        </a>-->
                    </div>
                </div>
                <div class="navbar-item">
                    <div class="buttons">
                        <LoadingButton :click="logout" class="is-danger">
                            <i class="far fa-power-off m-0"></i>
                        </LoadingButton>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                mainClass: {
                    'navbar-menu': true,
                    'is-active': false
                },

                burgerClass: {
                    'navbar-burger': true,
                    'burger': true,
                    'is-active': false,
                }
            }
        },
        watch: {
            '$route.name'() {
                this.hideBurger();
            }
        },
        methods: {
            hideBurger() {
                this.mainClass['is-active'] = false;
                this.burgerClass['is-active'] = false;
            },
            toggleMenu() {
                this.mainClass['is-active'] = !this.mainClass['is-active'];
                this.burgerClass['is-active'] = !this.burgerClass['is-active'];
            },
            logout(btn) {
                return this.$api.postToRoute('auth.logout', {}, {
                    yes: () => {
                        this.$store.commit('setLogged', false);
                        this.$store.commit('setUser', null);
                        this.$router.push({name: 'index'})
                    },
                    any: () => btn.stopLoading()
                });
            }
        }
    }
</script>
