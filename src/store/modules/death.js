// import graphql from '@/service/api/graphql'

export default {
  state: {
    death: []
  },
  mutations: {
    saveBirthdays(state, params) {
      state.death = params
    }
  },
  actions: {}
}
