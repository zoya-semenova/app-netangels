import { SET_NEWS } from './mutations'
import NewsService from '@/services/News/News.service'

export const GET_NEWS = 'GET_NEWS'

export default {
  async [GET_NEWS] ({ commit }, params) {
    const news = await NewsService.getNews(params)
    commit(SET_NEWS, news)
  }
}
