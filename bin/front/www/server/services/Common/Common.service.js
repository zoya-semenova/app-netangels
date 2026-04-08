
import SettingsModel from './Models/Settings.model.js'
import { Service } from '../Service.class.js'


import { defineEventHandler, getQuery } from 'h3'
import { useBitrix24 } from '~~/server/composables/useBitrix24'
import { LoggerBrowser, EnumCrmEntityTypeId } from '@bitrix24/b24jssdk'


class CommonService extends Service {

  async saveSettings (data) {

   // if (!process.client) {
      // import { writeFile } from 'node:fs'
      // const payload = new URLSearchParams()
      // payload.append('name', 'menu')
      // // path = "http://localhost:80/news/"
      let res = await this.post("http://127.0.0.1:3002/api/settings", data)
      // //data =  await dispatch(GET_CONTACTS)
      // writeFile("./settings.json", params)
       res = SettingsModel.checkValue(res)

      return res;
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

    async getEmployees () {

        //let data = await this.get("http://127.0.0.1:3002/api/employees")
        // //data =  await dispatch(GET_CONTACTS)
        // writeFile("./settings.json", params)
        // data = SettingsModel.checkValue(data)


        const $logger = LoggerBrowser.build('api/employees.get/', true)

                   const { $b24 } = await useBitrix24(event, $logger)


            // const pageNumber = Number.parseInt(page as string) || 1
            // const start = (pageNumber - 1) * 50

            try {
                const response = await $b24.callMethod(
                    'im.department.employees.get',
                    {
                        ID: [3],
                        USER_DATA: 'Y'
                    }
                )

                $logger.log({
                    method: 'im.department.employees.get',
                    // page,
                    // start
                })


                const data = response.getData()

                const list = data.result['']
                const time = data.time

                $logger.log({
                    list
                })

                try {
                    const response = await $b24.callMethod(
                        'department.get',
                        {
                        }
                    )

                    const data = response.getData()

                    const departments = data.result

                    $logger.log({
                        departments
                    })

                    const mapDepartments = Object.fromEntries(departments.map(dep => [dep.ID, dep]));
                    console.log(mapDepartments);console.log('mapDepartments')

                    return  {'list': list.map(user => ({
                            ...user,
                            departments: user.departments.map(dep =>
                                mapDepartments[dep].NAME
                            )
                        }))};

                } catch (error) {
                    $logger.error('Bitrix24 Error:', error)

                }

            } catch (error) {
                $logger.error('Bitrix24 Error:', error)

            }


        return data;
    }
}

export default new CommonService()
