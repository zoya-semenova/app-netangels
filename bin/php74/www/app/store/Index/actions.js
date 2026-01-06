import IndexService from '@/services/Index/Index.service'
import AboutService from '@/services/About/About.service'
import CommonService from '@/services/Common/Common.service'

import {
  SET_ABOUT,
  SET_HERO,
  SET_LONG_GRID,
  SET_BANNER
} from '@/store/Index/mutations'

export const GET_HERO = 'GET_HERO'
export const GET_ABOUT = 'GET_ABOUT'
export const GET_LONG_GRID = 'GET_LONG_GRID'
export const GET_BANNER = 'GET_BANNER'

export default {
  async [GET_HERO] ({ commit }) {
    const data = await IndexService.getHero()
    commit(SET_HERO, data.index)
  },
  async [GET_ABOUT] ({ commit }) {
    const data = await AboutService.getIndex()
    commit(SET_ABOUT, data.about)
  },
  async [GET_LONG_GRID] ({ commit }) {
    const data = await IndexService.getLongGrid()
    commit(SET_LONG_GRID, data.imagesBlock)
  },
  async [GET_BANNER] ({ commit }) {
    const { banner } = await CommonService.getBanner()
    commit(SET_BANNER, banner)
  }
}
