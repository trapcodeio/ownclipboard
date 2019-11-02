import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthLayout from '../views/AuthLayout';
import Dashboard from '../views/Dashboard';
import Devices from '../views/Settings/Devices';
import DocsLayout from '../views/Docs/Layout';

const DocsIndex = () => import(/* webpackChunkName: "docs" */ '../views/Docs/Index.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Home
    },

    // Logged Routes
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: 'clipboard',
                name: 'clipboard',
                component: Dashboard
            },
            {
                path: 'devices',
                name: 'devices',
                component: Devices
            }
        ]
    },

    {
        path: '/docs',
        component: DocsLayout,
        children: [
            {
                path: '',
                name: 'docs',
                component: DocsIndex,
            }
        ]
    }

    //
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
      }
    }*/
];

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
});

export default router
