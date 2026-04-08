export const SET_MODAL = 'SET_MODAL'
export const RESET_MODAL = 'RESET_MODAL'
export const OPEN_MENU = 'OPEN_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'
export const TOGGLE_MENU = 'TOGGLE_MENU'
export const SET_LINKS = 'SET_LINKS'
export const SET_CONTACTS = 'SET_CONTACTS'
export const SET_MENU = 'SET_MENU'
export const SET_SOCIAL = 'SET_SOCIAL'
export const SET_PREMISE_TYPES_LIST = 'SET_PREMISE_TYPES_LIST'
export const SET_PREMISE_STATUS_LIST = 'SET_PREMISE_STATUS_LIST'
export const SET_SORT_LIST = 'SET_SORT_LIST'
export const SET_TURNS = 'SET_TURNS'
export const SET_SECTIONS = 'SET_SECTIONS'
export const SET_COMPLEX = 'SET_COMPLEX'
export const SET_TYPE_FLATS = 'SET_TYPE_FLATS'
export const SET_MASS_MEDIA = 'SET_MASS_MEDIA'

export default {
  [SET_MODAL]: (state, { type, data }) => {
    state.modal = { type, data }
  },
  [RESET_MODAL]: (state, _) => {
    state.modal = {
      type: null,
      data: null
    }
  },
  [OPEN_MENU]: (state) => {
    state.menuOpen = true
  },
  [CLOSE_MENU]: (state) => {
    state.menuOpen = false
  },
  [TOGGLE_MENU]: (state) => {
    state.menuOpen = !state.menuOpen
  },
  [SET_LINKS]: (state, links) => {
    state.links = links
  },
  [SET_CONTACTS]: (state, contacts) => {
    state.contacts = contacts
  },
  [SET_MENU]: (state, menu) => {
    state.menu = menu
  },
  [SET_SOCIAL]: (state, social) => {
    state.social = social
  },
  [SET_PREMISE_STATUS_LIST]: (state, statusList) => {
    state.premiseStatusList = statusList
  },
  [SET_PREMISE_TYPES_LIST]: (state, typesList) => {
    state.premiseTypesList = typesList
  },
  [SET_SORT_LIST]: (state, sortList) => {
    state.sortList = sortList
  },
  [SET_TURNS]: (state, turns) => {
    state.turns = turns
  },
  [SET_SECTIONS]: (state, sections) => {
    const rewriteLink = (type, turnId) => {
      const rewriteTypes = ['commerce', 'parking', 'storerooms']
      return rewriteTypes.includes(type) ? `/${type}/?turnId=${turnId}` : null
    }
    const premiseTypes = Object.values(state.premiseTypesList)
    const sectionsProcessed = sections.map(section => {
      const turnId = section.turn._id
      return {
        ...section,
        floor: section.floor.map(floor => {
          const [floorPremise] = floor.premise
          const premiseTypeId = floorPremise?._type
          const premiseType = premiseTypes.find(type => type._id === premiseTypeId)
          const premiseTypeName = premiseType?._name
          return {
            ...floor,
            link: rewriteLink(premiseTypeName, turnId) || floor.link
          }
        })
      }
    })
    state.sections = sectionsProcessed
  },
  [SET_COMPLEX]: (state, complexList) => {
    const [complex] = complexList
    state.complex = complex
  },
  [SET_TYPE_FLATS]: (state, typeFlats) => {
    state.typeFlats = typeFlats
  },
  [SET_MASS_MEDIA]: (state, data) => {
    state.massMedia = data
  }
}
