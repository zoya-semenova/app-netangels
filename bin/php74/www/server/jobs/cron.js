
import CommonService from '../services/Common/Common.service.js'
import {Service} from '../services/Service.class.js'

class CronService extends Service {

    async start () {
        console.log('Запуск cron-tab');
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        const responseEmployees  = await CommonService.getEmployees();

        const responseSettings = await CommonService.getSettings();

        console.log('responseEmployees')
       console.log(responseEmployees)
    }
}

const cron = new CronService();
await cron.start();
export default new CronService()

