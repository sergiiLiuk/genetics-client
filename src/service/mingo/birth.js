import mingo from 'mingo'
import search from '@/imports/search'

export function mingoFilter(data, state) {
  let res = search({
    list: data,
    search: state.filters.search,
    fields: ['birthPlace', 'firstName']
  })

  let query = {}

  if (state.filters.birthPlace !== '') {
    query['birthPlace'] = {
      $eq: state.filters.birthPlace
    }
  }

  return mingo.find(res, query).all()

  //   let sortObj = {}

  //   sortObj[ASSETS_OBSERVER.state.settings.sortBy] = ASSETS_OBSERVER.state.settings.descending
  //     ? -1
  //     : 1

  //   return mingo.find(res, query).sort(sortObj).all()
}
