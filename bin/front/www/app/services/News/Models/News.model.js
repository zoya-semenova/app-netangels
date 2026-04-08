import Model, { arrayStrategy, booleanStrategy, numberStrategy, stringStrategy } from '@phoenix-cg/model'

export const newsItem = new Model({
  id: numberStrategy,
  title: stringStrategy,
  date: stringStrategy,
  link: stringStrategy,
  promo: booleanStrategy,
  preview: stringStrategy,
  dateFinish: stringStrategy
})

const paginate = new Model({})//[]
//new Model([]
//{
 // remainderValue: numberStrategy
//}
//)

export default new Model({
  list: arrayStrategy.of(newsItem),
  paginate: arrayStrategy.of(paginate)
}, 'NewsModel')
