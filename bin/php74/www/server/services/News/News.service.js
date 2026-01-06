import { Service } from '../Service.class'
import NewsModel from './Models/News.model'
import NewsOneModel from './Models/NewsOne.model'

class NewsService extends Service {
  namespace = 'api/news'

  async getNews (params) {
    const url = 'list'
    const data = await this.get(url, { params })
    return NewsModel.checkValue(data)
  }

  async getNewsItem (params) {
    const url = 'show'
    const data = await this.get(url, { params })
    return NewsOneModel.checkValue(data)
  }
}

export default new NewsService()
