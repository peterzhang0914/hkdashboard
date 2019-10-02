import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import Login from '@/views/auth/login'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: '/wuliu',
        children: [
            {
                path: 'wuliu',
                name: 'wuliu',
                component: () => import('@/views/wuliu'),
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },

]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

// eslint-disable-next-line no-unused-vars
function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}


const router = createRouter()


export default router
