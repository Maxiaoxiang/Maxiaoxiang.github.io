/*
 * @Author: maxiaoxiang
 * @Date: 2017-07-18 15:37:31 
 * @Last Modified by: maxiaoxiang
 * @Last Modified time: 2017-07-31 14:18:38
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import index from './components/Index.vue'
import project from './components/Project.vue'
import photography from './components/Photography.vue'
import message from './components/Message.vue'
import jqueryPagination from './components/plugins/JqueryPagination.vue'
import jqueryToolTip from './components/plugins/JqueryToolTip.vue'
import vuePagination from './components/plugins/VuePagination.vue'
import javascriptSlider from './components/plugins/JavascriptSlider.vue'
import snaker from './components/game/Snaker.vue'

Vue.use(VueRouter)

/**
 * index       => 主页
 * project     => 项目
 * photography => 摄影
 * message     => 留言
 */
const routes = [{
    path: '/',
    component: index,
    meta: {
        title: 'Mss'
    }
}, {
    path: '/project',
    component: project,
    meta: {
        title: '项目 - Mss'
    }
}, {
    path: '/project/jquery-pagination',
    component: jqueryPagination,
    meta: {
        title: 'pagination.js 分页 jquery分页插件'
    }
}, {
    path: '/project/jquery-tooltip',
    component: jqueryToolTip,
    meta: {
        title: 'tooltip.js 信息提示 jquery提示插件'
    }
}, {
    path: '/project/javascript-slider',
    component: javascriptSlider,
    meta: {
        title: 'javasrcript轮播 javascript轮播插件 原生js'
    }
}, {
    path: '/project/vue-pagination',
    component: vuePagination,
    meta: {
        title: 'vue分页 vue分页插件'
    }
}, {
    path: '/project/snaker',
    component: snaker,
    meta: {
        title: '贪吃蛇'
    }
}, {
    path: '/message',
    component: message,
    meta: {
        title: '留言板 - Mss'
    }
}, {
    path: '/photography',
    component: photography,
    meta: {
        title: '摄影 - Mss'
    }
}]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
})

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
