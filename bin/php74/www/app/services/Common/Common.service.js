
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
       data = await this.post("http://127.0.0.1:3002/api/settings", data)
      // //data =  await dispatch(GET_CONTACTS)
      // writeFile("./settings.json", params)
       data = SettingsModel.checkValue(data)

      return data;
   // }
  }

    async saveTest (data) {
        // if (!process.client) {
        // import { writeFile } from 'node:fs'
        // const payload = new URLSearchParams()
        // payload.append('name', 'menu')
        // // path = "http://localhost:80/news/"
        data = await this.post("http://127.0.0.1:3002/api/calendar", data)
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
        let data = await this.get("http://127.0.0.1:3002/api/settings")
        // //data =  await dispatch(GET_CONTACTS)
        // writeFile("./settings.json", params)
         data = SettingsModel.checkValue(data)

        return data;
        // }
    }

}

export default new CommonService()
