import graphql from '@/service/api/graphql'

export default {
  state: {
    death: []
  },
  mutations: {
    saveDeath(state, params) {
      state.death = params
    }
  },
  actions: {
    async GET_DEATH(context) {
      let response = await graphql(
        `
          query {
            deathRecords {
              id
              firstName
              secondName
              lastName
              year
              actNumber
              sex
              locality
              birthday
              photo
              note
              fatherName
              motherName
              motherLastname
              parish
            }
          }
        `
      )
      context.commit('saveDeath', response.data.deathRecords)
    }
  }
}
