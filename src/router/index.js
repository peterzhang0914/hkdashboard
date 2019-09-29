import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layouts/index'
import Login from '@/views/auth/login'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/logistic',
        children: [
            {
                path: 'logistic',
                name: 'logistic',
                component: () => import('@/views/logistic/index'),
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})


const router = createRouter()


export default router