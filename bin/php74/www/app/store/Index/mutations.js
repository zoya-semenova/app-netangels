export const SET_HERO = 'SET_HERO'
export const SET_ABOUT = 'SET_ABOUT'
export const SET_LONG_GRID = 'SET_LONG_GRID'
export const SET_BACKGROUND_CLASS = 'SET_BACKGROUND_CLASS'
export const ADD_BG_LAYOUT = 'ADD_BG_LAYOUT'
export const RESET_BG_LAYOUTS = 'RESET_BG_LAYOUTS'
export const SET_BG_LAYOUT_VALUE = 'SET_BG_LAYOUT_VALUE'
export const SET_BANNER = 'SET_BANNER'
export const SHOW_INDEX_BANNER = 'SHOW_INDEX_BANNER'
export const HIDE_INDEX_BANNER = 'HIDE_INDEX_BANNER'

export default {
  [SET_HERO]: (state, data) => {
    state.hero = data
  },
  [SET_ABOUT]: (state, data) => {
    state.about = data
  },
  [SET_LONG_GRID]: (state, data) => {
    state.longGrid = data
  },
  [SET_BACKGROUND_CLASS]: (state, value) => {
    state.backgroundClass = value
  },
  [ADD_BG_LAYOUT]: (state, value) => {
    state.bgLayouts.push(value)
  },
  [SET_BG_LAYOUT_VALUE]: (state, { uid, value }) => {
    const layout = state.bgLayouts.find(layout => layout.uid === uid)
    if (layout) {
      layout.active = value
    }
  },
  [RESET_BG_LAYOUTS]: (state) => {
    state.bgLayouts = []
  },
  [SET_BANNER]: (state, data) => {
    state.banner = data
  },
  [SHOW_INDEX_BANNER]: (state) => {
    state.indexBannerShown = true
  },
  [HIDE_INDEX_BANNER]: (state) => {
    state.indexBannerShown = false
  }
}
