import Vue from 'vue'
import Router from 'vue-router'
//-------------------------wangyiyun---------------------//
//-------------------------主页---------------------//
import Index from '../wangyiyun/Index'
//-------------------------子页---------------------//
import Main from '../wangyiyun/Main'
// import SearchShop from '../wangyiyun/SearchShop'
import Login from '../wangyiyun/Login'
import Reg from '../wangyiyun/Reg'
import MusicList from '../wangyiyun/MusicList'
import Music from '../wangyiyun/Music'

// import ShopCar from '../wangyiyun/ShopCar'
// import App from './App.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/index',
    component: Index,
    children: [{
      path: 'main',
      component: Main
    }, {
      path: 'login',
      component: Login
    }, {
      path: 'reg',
      component: Reg
    }]
  }, {
    path: '/musicList',
    component: MusicList
  }, {
    path: '/music',
    component: Music
  }]
})
