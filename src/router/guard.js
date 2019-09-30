import router from '@/router'
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
import {getToken} from "@/utils/cookies"

NProgress.configure({showSpinner: false})

const whiteList = ['/login',]

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
    NProgress.done()
});

router.afterEach(() => {
    NProgress.done()
});
