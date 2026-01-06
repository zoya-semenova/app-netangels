
import SettingsModel from './Models/Settings.model'
import { Service } from '@/services/Service.class'

class CommonService extends Service {
  async getSettings (data) {
  //  if (!process.client) {
      // import { writeFile } from 'node:fs'
      // const payload = new URLSearchParams()
      // payload.append('name', 'menu')
      // // path = "http://localhost:80/news/"
      // // data = await this.get("http://localhost:3002/api/contacts/contacts", payload)
      // //data =  await dispatch(GET_CONTACTS)
      // writeFile("./settings.json", params)
      // data = SettingsModel.checkValue(data)

      return data;
  //  }
  }

}

export default new CommonService()
