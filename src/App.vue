<template>
    <div id="app">
        <router-view/>
        <div class="has-text-centered my-3">
            <router-link class="footer-link" to="/">Home</router-link>
            <router-link class="footer-link" to="/help">Help</router-link>
            <router-link class="footer-link" to="/docs">Api Documentation</router-link>
        </div>
    </div>
</template>


<style lang="scss" scoped>

    #app {
        min-height: calc(100vh - 70px);
        /*height: 100vh;*/

        .footer-link {
            padding: 0 5px 0 5px;
            color: #62c462;

        }


    }

    h1 {
        height: 50px;
        /*position: relative;*/
        /*bottom: 50px;*/
    }

    /*
      #footer-link{
        display: block;
        margin-left: auto;
        margin-right: auto;

      }

    */


</style>
