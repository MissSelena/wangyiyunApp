import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import musicList from './modules/musicList'
const store = new Vuex.Store({
    modules: {
      musicList
     
    }
  })
  export default store;