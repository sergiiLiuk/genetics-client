import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import app from '@/store/modules/app'
import births from '@/store/modules/births'
import marriage from '@/store/modules/marriage'
import death from '@/store/modules/death'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage
  // reducer: (state) => ({
  //   births: state.births.births
  // })
})

const initialState = () => ({})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: initialState(),
  modules: {
    app,
    births,
    marriage,
    death
  }
})
