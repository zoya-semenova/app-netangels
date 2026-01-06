
import SettingsModel from './Models/Settings.model'
import { ServiceT } from '@/services/ServiceT.class'

class CommonServiceT extends ServiceT {
  async getSettings (data) {

      // import { writeFile } from 'node:fs'
      // const payload = new URLSearchParams()
      // payload.append('name', 'menu')
      // // path = "http://localhost:80/news/"
      // // data = await this.get("http://localhost:3002/api/contacts/contacts", payload)
      // //data =  await dispatch(GET_CONTACTS)
      // writeFile("./settings.json", params)
      // data = SettingsModel.checkValue(data)

      return data;

  }

}

export default new CommonService()
