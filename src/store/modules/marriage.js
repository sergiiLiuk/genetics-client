import graphql from '@/service/api/graphql'
export default {
  state: {
    marriage: []
  },
  mutations: {
    saveMarriage(state, params) {
      state.marriage = params
    }
  },
  actions: {
    async GET_MARRIAGE(context) {
      let response = await graphql(
        `
          query {
            marriageRecords {
              id
              husbandFirstName
              husbandSecondName
              husbandLastName
              wifeFirstName
              wifeSecondName
              wifeLastName
              actNumber
              year
              locality
              marriageDate
              photo
              note
              husbandFatherName
              husbandMotherName
              husbandMotherLastname
              wifeFatherName
              wifeMotherName
              wifeMotherLastname
              parish
            }
          }
        `
      )
      context.commit('saveMarriage', response.data.marriageRecords)
    }
  }
}
