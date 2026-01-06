export const MENU_OPEN = 'MENU_OPEN'
export const LINKS = 'LINKS'
export const CONTACTS = 'CONTACTS'
export const MENU = 'MENU'
export const SOCIAL = 'SOCIAL'
export const PREMISE_TYPE = 'PREMISE_TYPE'
export const PREMISE_TYPE_MAP = 'PREMISE_TYPE_MAP'
export const PREMISE_STATUS = 'PREMISE_STATUS'
export const PREMISE_STATUS_MAP = 'PREMISE_STATUS_MAP'
export const SORT_LIST = 'SORT_LIST'
export const TURNS = 'TURNS'
export const SECTIONS = 'SECTIONS'
export const MODAL_TYPE = 'MODAL_TYPE'
export const MODAL_DATA = 'MODAL_DATA'
export const COMPLEX = 'COMPLEX'
export const FLOORS = 'FLOORS'
export const TYPE_FLATS = 'TYPE_FLATS'
export const MASS_MEDIA = 'MASS_MEDIA'

export default {
  [MENU_OPEN]: (state) => {
    return state.menuOpen
  },
  [LINKS]: (state) => {
    return state.links
  },
  [CONTACTS]: (state) => {
    return state.contacts
  },
  [MENU]: (state) => {
    return state.menu
  },
  [SOCIAL]: (state) => {
    return state.social
  },
  [PREMISE_TYPE]: (state) => {
    return Object.values(state.premiseTypesList)
  },
  [PREMISE_TYPE_MAP]: (state) => {
    return state.premiseTypesList
  },
  [PREMISE_STATUS]: (state) => {
    return Object.values(state.premiseStatusList)
  },
  [PREMISE_STATUS_MAP]: (state) => {
    return state.premiseStatusList
  },
  [SORT_LIST]: (state) => {
    return state.sortList
  },
  [TURNS]: (state) => {
    return state.turns
  },
  [SECTIONS]: (state) => {
    return state.sections
  },
  [MODAL_TYPE]: (state) => {
    return state.modal.type
  },
  [MODAL_DATA]: (state) => {
    return state.modal.data
  },
  [COMPLEX]: (state) => {
    return state.complex
  },
  [FLOORS]: (state) => {
    return state.sections?.reduce((floors, section) => {
      return [...floors, ...section.floor]
    }, [])
  },
  [TYPE_FLATS]: (state) => {
    return state.typeFlats
  },
  [MASS_MEDIA]: (state) => {
    return state.massMedia
  }
}
