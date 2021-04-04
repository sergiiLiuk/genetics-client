import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import app from '@/store/modules/app'
import birth from '@/store/modules/birth'
import marriage from '@/store/modules/marriage'
import death from '@/store/modules/death'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage
  // reducer: (state) => ({
  //   birth: state.birth.birth
  // })
})

const initialState = () => ({})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: initialState(),
  modules: {
    app,
    birth,
    marriage,
    death
  }
})
