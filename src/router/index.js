import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Help from '../views/Help.vue'
import AuthLayout from '../views/AuthLayout';
import Dashboard from '../views/Dashboard';
import DocsLayout from '../views/Docs/Layout';

const Devices = () => import(/* webpackChunkName: "logged" */ '../views/Settings/Devices');
const Password = () => import(/* webpackChunkName: "logged" */ '../views/Settings/Password');
const DocsIndex = () => import(/* webpackChunkName: "docs" */ '../views/Docs/Index.vue');

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Home
    },

    {
        path: '/help',
        name: 'help',
        component: Help
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
            },
            {
                path: 'password',
                name: 'password',
                component: Password
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
