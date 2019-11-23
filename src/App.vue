<template>
  <div id="app">
    <router-view/>

<div class="has-text-centered  has-text-centered">
  <router-link class="navbar-item" to="/">Home</router-link>
  <router-link class="navbar-item" to="/help">Help</router-link>
  <router-link class="navbar-item" to="/docs">Api Documentation</router-link>
</div>

  </div>
</template>


<style lang="scss" scoped>

  #app{
    min-height: calc(100vh - 70px);
    /*height: 100vh;*/




  }

  h1{
    height: 50px;
    /*position: relative;*/
    /*bottom: 50px;*/
  }





</style>
