import Model, { arrayStrategy, booleanStrategy, stringStrategy } from '@phoenix-cg/model'
import { newsItem } from './News.model'

export default new Model({
  id: stringStrategy,
  title: stringStrategy,
  text: stringStrategy,
  date: stringStrategy,
  promo: booleanStrategy,
  img: stringStrategy,
  dateEnd: stringStrategy,
  latestNews: arrayStrategy.of(newsItem)
}, 'NewsOneModel')
