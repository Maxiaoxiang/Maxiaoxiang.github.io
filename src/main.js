/*
 * @Author: maxiaoxiang 
 * @Date: 2017-07-18 15:37:31 
 * @Last Modified by: maxiaoxiang
 * @Last Modified time: 2017-07-19 15:09:49
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
import vuePagination from './components/plugins/VuePagination.vue'
import game from './components/project/Game.vue'
import jqueryPlugins from './components/project/JqueryPlugins.vue'
import vuePlugins from './components/project/VuePlugins.vue'
import snaker from './components/game/Snaker.vue'

Vue.use(VueRouter)

/**
 * index       => 主页
 * project     => 项目
 * plugins     => 插件
 * game        => 游戏
 * photography => 摄影
 * message     => 留言
 */
const routes = [{
    path: '/',
    component: index,
    meta: {
      title: 'Mss'
    }
  },
  {
    path: '/project',
    component: project,
    meta: {
      title: '项目 - Mss'
    },
    children: [{
      path: 'jquery',
      component: jqueryPlugins,
      meta: {
        title: 'jQuery插件 - Mss'
      },
      children: [{
        path: 'jquery-pagination',
        component: jqueryPagination
      }]
    }, {
      path: 'vue',
      component: vuePlugins,
      meta: {
        title: 'Vue插件 - Mss'
      },
      children: [{
        path: 'vue-pagination',
        component: vuePagination
      }]
    }, {
      path: 'game',
      component: game,
      meta: {
        title: '游戏 - Mss'
      },
      children: [{
        path: 'snaker',
        component: snaker,
        meta: {
          title: '贪吃蛇 - Mss'
        },
      }]
    }]
  },
  {
    path: '/message',
    component: message,
    meta: {
      title: '留言板 - Mss'
    },
  },
  {
    path: '/photography',
    component: photography,
    meta: {
      title: '摄影 - Mss'
    },
  }
]

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
