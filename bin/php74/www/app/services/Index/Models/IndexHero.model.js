import Model from '@phoenix-cg/model'
import * as strategies from '@phoenix-cg/model/strategies'

const images = new Model({
  desktop: strategies.stringStrategy,
  tablet: strategies.stringStrategy,
  mobile: strategies.stringStrategy
})

const index = new Model({
  button: strategies.stringStrategy,
  desc: strategies.stringStrategy,
  descLink: strategies.stringStrategy,
  link: strategies.stringStrategy,
  shield: strategies.arrayStrategy.of(strategies.stringStrategy),
  title: strategies.stringStrategy,
  images,
  timer: strategies.stringStrategy
})

export default new Model({
  index
}, 'IndexHeroModel')
