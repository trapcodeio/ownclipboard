// Css
import './scss/bs4-helper.scss';
import './scss/app.scss';

// SweetAlert
import Swal from "sweetalert2";
import '../node_modules/@sweetalert2/themes/dark/dark.min.css';

window['Swal'] = Swal;


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
