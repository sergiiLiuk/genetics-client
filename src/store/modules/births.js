import graphql from '@/service/api/graphql'

export default {
  state: {
    births: []
  },
  mutations: {
    saveBirthdays(state, params) {
      state.births = params
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
              birthPlace
              birthday
              photo
              note
              fatherName
              motherName
              motherLastname
              recordedBy
            }
          }
        `
      )
      context.commit('saveBirthdays', response.data.birthRecords)
    }
  }
}
