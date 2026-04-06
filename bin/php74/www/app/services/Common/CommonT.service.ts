
import SettingsModel from './Models/Settings.model'
import { ServiceT } from '~/services/ServiceT.class'


class CommonServiceT extends ServiceT {
  async saveCalendar (data) {

      // import { writeFile } from 'node:fs'
      // const payload = new URLSearchParams()
      // payload.append('name', 'menu')
      // // path = "http://localhost:80/news/"
       data = await this.post("https://vm-ad77e947.na4u.ru/api/calendar", data)
      // //data =  await dispatch(GET_CONTACTS)
      // writeFile("./settings.json", params)
      // data = SettingsModel.checkValue(data)

      return data;

  }

    async saveEvent (data) {

        // import { writeFile } from 'node:fs'
        // const payload = new URLSearchParams()
        // payload.append('name', 'menu')
        // // path = "http://localhost:80/news/"
        data = await this.post("https://vm-ad77e947.na4u.ru/api/event", data)
        // //data =  await dispatch(GET_CONTACTS)
        // writeFile("./settings.json", params)
        // data = SettingsModel.checkValue(data)

        return data;

    }

    async saveChat (data) {

        // import { writeFile } from 'node:fs'
        // const payload = new URLSearchParams()
        // payload.append('name', 'menu')
        // // path = "http://localhost:80/news/"
        data = await this.post("https://vm-ad77e947.na4u.ru/api/chat", data)
        // //data =  await dispatch(GET_CONTACTS)
        // writeFile("./settings.json", params)
        // data = SettingsModel.checkValue(data)

        return data;

    }
    async saveBot (data) {

        // import { writeFile } from 'node:fs'
        // const payload = new URLSearchParams()
        // payload.append('name', 'menu')
        // // path = "http://localhost:80/news/"
        data = await this.post("https://vm-ad77e947.na4u.ru/api/bot", data)
        // //data =  await dispatch(GET_CONTACTS)
        // writeFile("./settings.json", params)
        // data = SettingsModel.checkValue(data)

        return data;

    }
}

export default new CommonServiceT()
