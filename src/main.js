/*
 * @Author: maxiaoxiang 
 * @Date: 2017-07-18 15:37:31 
 * @Last Modified by: maxiaoxiang
 * @Last Modified time: 2017-07-18 17:30:18
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
    component: index
  },
  {
    path: '/project',
    component: project,
    children: [{
      path: 'jquery',
      component: jqueryPlugins,
      children: [{
        path: 'jquery-pagination',
        component: jqueryPagination
      }]
    },{
      path: 'vue',
      component: vuePlugins,
      children: [{
        path: 'vue-pagination',
        component: vuePagination
      }]
    },{
      path: 'game',
      component: game,
      children: [{
        path: 'snaker',
        component: snaker
      }]
    }]
  },
  {
    path: '/message',
    component: message
  },
  {
    path: '/photography',
    component: photography
  }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
