
import SettingsModel from './Models/Settings.model'
import { Service } from '@/services/Service.class'

class CommonService extends Service {

    async setCalendar() {

    }
  async saveSettings (data) {

   // if (!process.client) {
      // import { writeFile } from 'node:fs'
      // const payload = new URLSearchParams()
      // payload.append('name', 'menu')
      // // path = "http://localhost:80/news/"
       data = await this.post("https://vm-ad77e947.na4u.ru:3004/api/settings", data)
      // //data =  await dispatch(GET_CONTACTS)
      // writeFile("./settings.json", params)
       data = SettingsModel.checkValue(data)

      return data;
   // }
  }

    async getSettings () {
        // if (!process.client) {
        // import { writeFile } from 'node:fs'
        // const payload = new URLSearchParams()
        // payload.append('name', 'menu')
        // // path = "http://localhost:80/news/"
        let data = await this.get("https://vm-ad77e947.na4u.ru:3004/api/settings")
        // //data =  await dispatch(GET_CONTACTS)
        // writeFile("./settings.json", params)
         data = SettingsModel.checkValue(data)

        return data;
        // }
    }

    async getEmployees () {

        const res = await this.get("https://vm-ad77e947.na4u.ru/api/employees")
        // //data =  await dispatch(GET_CONTACTS)
        // writeFile("./settings.json", params)
        // data = SettingsModel.checkValue(data)

        return res;
    }
}

export default new CommonService()
