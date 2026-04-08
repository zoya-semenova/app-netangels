export const HERO = 'HERO'
export const ABOUT = 'ABOUT'
export const LONG_GRID = 'LONG_GRID'
export const BG_CLASS = 'BG_CLASS'
export const BG_LAYOUTS = 'BG_LAYOUTS'
export const BANNER = 'BANNER'
export const INDEX_BANNER_SHOWN = 'INDEX_BANNER_SHOWN'

export default {
  [HERO]: state => state.hero,
  [ABOUT]: state => state.about,
  [LONG_GRID]: state => state.longGrid,
  [BG_CLASS]: state => state.backgroundClass,
  [BG_LAYOUTS]: state => state.bgLayouts,
  [BANNER]: state => state.banner,
  [INDEX_BANNER_SHOWN]: state => state.indexBannerShown
}
