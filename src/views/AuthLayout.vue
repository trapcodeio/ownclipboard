<template>
    <section>
        <PreLoader v-if="logged===null"/>
        <template v-else-if="logged===true">
            <NavBar/>
            <div class="columns">
                <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
                    <router-view></router-view>
                </div>
            </div>
        </template>
        <div v-else class="has-text-centered">
            <h3 class="mt-5 is-size-3">You are not logged!</h3>
            <router-link :to="{name: 'index'}" class="button mt-3">Go Home</router-link>
        </div>
    </section>
</template>

<script>
    import NavBar from "../components/NavBar";
    import {mapState} from "vuex";

    export default {
        components: {NavBar},
        computed: mapState(['logged'])
    }
</script>
