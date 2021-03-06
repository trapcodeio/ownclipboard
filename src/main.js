// SweetAlert
import Swal from "sweetalert2";
window['Swal'] = Swal;

// Css
import './scss/bs4-helper.scss';
import './scss/app.scss';


// Import Bundle
import './bundle';


// Import Vue
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootMixin from "./BootMixin";

Vue.config.productionTip = false;

new Vue({
    router,
    mixins: [BootMixin],
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');
