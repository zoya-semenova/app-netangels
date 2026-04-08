
class Model {
  constructor (model = {}, name = '') {
    this.model = model
    this.setName(name)
    this.setFields()
  }
  checkValue (value) {
   // if (getType(value) !== 'Object') {
   //   console.error(`Model ${this.name}: invalid value type: ${getType(value)}`)
   //   return value
   // }
    if (!this.fields) {
      return value
    }
    const defaultValue = {
      chat: true,
      textchat: '',
      livefeed:true,
      daylivefeed:'3',
      timelivefeed:'12',
      wholivefeed:'company',
      textarea:''
    };
    const newValue = {}
    this.fields.forEach(field => {
      const fieldStrategy = this.model[field].strategy || this.model[field]
      try {
        const childModelName = `${this.name}.${field}`
        if (fieldStrategy instanceof Model) {
          fieldStrategy.setName(childModelName)
        }
        if (value[field] === undefined) {
          newValue[field] = defaultValue[field];
          if (this.model[field].required) {
            console.error(`Missing field in response: ${field}`)
          }
        } else {
          if (Array.isArray(fieldStrategy)) {
            const result = []
            fieldStrategy.forEach(strategy => {
              let childModelValue = {}
              try {
                if (strategy.checkValue) {
                  strategy.setName(childModelName)
                  childModelValue = strategy.checkValue(value[field])
                } else {
                  childModelValue = strategy(value[field], childModelName)
                }
                result.push({
                  error: false,
                  value: childModelValue
                })
              } catch (e) {
                result.push({
                  error: true,
                  value: childModelValue
                })
              }
            })
            if (!result.find(res => !res.error)) {
              console.error(`No valid model for strategy set: ${field}`)
              //throw new Error(`No valid model for strategy set: ${field}`)
            } else {
              value[field] = result.find(res => !res.error).value
            }
          } else {
            newValue[field] = fieldStrategy.checkValue ? fieldStrategy.checkValue(value[field]) : fieldStrategy(value[field], childModelName)
          }
        }
      } catch (e) {
        console.error(`Model: ${this.name}`)
        console.error(e, '\nValue:', value)
      }
    })
    Object.keys(value).forEach(field => {
      if (!this.fields.includes(field)) {
        console.error(`Model: ${this.name}: Unknown field ${field}`)
      }
    })
    return { ...value, ...newValue }
  }
  setFields () {
    this.fields = Object.keys(this.model)
  }
  setName (name) {
    this.name = name
  }
}

export default Model
