import graphql from '@/service/api/graphql'

export default {
  state: {
    birth: []
  },
  mutations: {
    saveBirthdays(state, params) {
      state.birth = params
    }
  },
  actions: {
    async GET_BIRTHS(context) {
      let response = await graphql(
        `
          query {
            birthRecords {
              id
              firstName
              secondName
              lastName
              actNumber
              sex
              year
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
      context.commit('saveBirthdays', response.data.birthRecords)
    }
  }
}
