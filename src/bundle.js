import Vue from "vue";

import VueTrapPack from 'vue-trap-pack';
import VTPBuilder from 'vue-trap-pack/Builder';
import {___} from '../storage/shared/routes-encrypted';
import XjsRoutesHandler from 'vue-trap-pack/utils/XjsRouteToUrl';
import HttpRequest from 'vue-trap-pack/HttpRequest';

import LoadingButton from "./components/LoadingButton";
import PreLoader from "./components/PreLoader";

const XjsRoutes = JSON.parse(atob(___));
const $api = new HttpRequest();
$api.isXmlRequest();
if (window.hasOwnProperty('NProgress'))
    $api.hasNprogress(window['NProgress']);
$api.routeHandler = XjsRoutesHandler(XjsRoutes);
$api.events.say = (msg, proceed) => {
    Swal.fire({
        type: proceed ? 'success' : 'error',
        text: msg,
    });
};

Vue.use(VueTrapPack, {
    api: $api,
});
Vue.component("LoadingButton", LoadingButton);
Vue.component("PreLoader", PreLoader);

window['Vue'] = Vue;
window['VTPBuilder'] = VTPBuilder;
