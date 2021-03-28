import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage
  // reducer: (state) => ({
  //   birthRecords: state.birthRecords
  // })
})

const initialState = () => ({})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: initialState(),
  modules: {
    // app,
    // birth
  }
})
