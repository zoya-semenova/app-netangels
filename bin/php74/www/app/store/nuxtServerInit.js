import {
  /*
  GET_LINKS,

  GET_SOCIAL,
  GET_PREMISE_TYPES_LIST,
  GET_PREMISE_STATUS_LIST,
  */
  GET_CONTACTS,
  GET_MENU

} from './actions'

export const nuxtServerInit = async ({ dispatch }) => {
  await dispatch(GET_MENU)
 // await dispatch(GET_CONTACTS)
//  await dispatch(GET_LINKS)
//  await dispatch(GET_SOCIAL)
 // await dispatch(GET_PREMISE_TYPES_LIST)
 // await dispatch(GET_PREMISE_STATUS_LIST)
}
