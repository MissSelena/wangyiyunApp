// const Ip = "http://127.0.0.1:7888";
import Vue from "vue";
// import Vuex from "vuex";
import App from './App'
import router from './router'
import VueRouter from "vue-router";
import axios from 'axios'
import {configIP} from "./IP";
Vue.config.productionTip = false;
import store from './store/index'
//---------------------------------muse-ui--------------------------------------//
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(VueRouter);
// Vue.use(Vuex);
Vue.use(MuseUI);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
})