import { Service } from '@/services/Service.class'
import IndexHeroModel from '@/services/Index/Models/IndexHero.model'
import LongGrid from '@/services/Common/Models/LongGrid.model'

class IndexService extends Service {
  constructor () {
    super()
    this.namespace = 'api/index'
  }

  async getHero () {
    const url = 'top-block'
    const data = await this.get(url)
    return IndexHeroModel.checkValue(data)
  }

  async getLongGrid () {
    const url = 'images-block'
    const data = await this.get(url)
    return LongGrid.checkValue(data)
  }
}

export default new IndexService()
