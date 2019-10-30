<template>
    <nav class="navbar is-dark">
        <div class="navbar-brand">
            <router-link :to="{name: 'clipboard'}" class="navbar-item">
                <h3 class="is-size-4"><i class="far fa-paste"></i> CloudClipper</h3>
            </router-link>
            <div class="navbar-burger burger" data-target="authNavMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="authNavMenu" class="navbar-menu">
            <div class="navbar-end mr-5 has-icon-left">
                <a class="navbar-item" href="https://bulma.io/">
                    <i class="far fa-clipboard"></i> ClipBoard
                </a>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
                        <i class="fa fa-user"></i> Account
                    </a>
                    <div class="navbar-dropdown is-boxed">
                        <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                            <i class="far fa-cog"></i> Settings
                        </a>
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
        methods: {
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
