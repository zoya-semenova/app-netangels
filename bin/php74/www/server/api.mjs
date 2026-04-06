import axios from 'axios'
import File from 'file-class'
import {
  backendTestServer,
  backendMockServer,
  usePostmanMock
} from '../conf.env.mjs'

import { server } from './backend.mjs'
import SettingsModel from "./services/Common/Models/Settings.model.js"
import Bitrix24API from './Bitrix24API.js'

import { writeFile } from 'fs/promises'
import { readFile } from 'fs/promises'

import Bree from 'bree'

import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
  initializeB24Frame,
  LoggerBrowser,
  B24Frame,
  Result,
  EnumCrmEntityTypeId,
  Text
} from '@bitrix24/b24jssdk'


const bitrix = new Bitrix24API();
const checkUrlValidity = url => url.slice(-1) !== '/'

if (!checkUrlValidity(backendTestServer) || !checkUrlValidity(backendMockServer)) {
  throw new Error('Invalid url in conf.env, remove slash at the end')
}

const buildEnv = process.env.BUILD
const backendURL = process.env.CONTENT_URL || backendTestServer

const buildFormData = (formData, data, parentKey) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
    })
    if (Array.isArray(data) && data.length === 0) {
      formData.set(parentKey, '')
    }
  } else {
    const value = data == null ? '' : data
    formData.set(parentKey, value)
  }
}

const jsonToFormData = (data) => {
  const formData = new URLSearchParams()
  buildFormData(formData, data)
  return formData
}

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

server.use(async (req, res) => {
  if (req.accepts('json')) {
    let url = backendURL + req.url
    const reqMethod = req.method.toLowerCase()
    let payload = {}
    const config = {
      headers: {
        'User-Agent': req.headers['user-agent']
      }
    }
    //console.log(req)
    if (reqMethod === 'post') {
      payload = jsonToFormData(req.body)
    }
   // try {
      if (req.query.postman && !buildEnv) {
        throw new Error('Use postman')
      }
     // const { data } = await axios[reqMethod](url, payload, config)
     // res.send(data)
   // } catch (error) {

    // const payload = new URLSearchParams()
    // payload.append('name', 'menu')
    // path = "http://localhost:80/news/"
    // data = await this.get("http://localhost:3002/api/contacts/contacts", payload)
    //data =  await dispatch(GET_CONTACTS)
    if (req.url == '/api/settings') {
      if (reqMethod === 'post') {

try{
        const result = await bitrix.makeRequest(
            'calendar.section.add',
            {
              type: 'user',
              ownerId: 1,
              name: 'New Section',
              description: 'Description for section',
              color: '#9cbeee',
              text_color: '#283000',
              export: {
                ALLOW: false,
                SET: '3_9'
              }
            }
        );
        console.log(result)
  console.log('CALENDAAAAAAR create');

      } catch (error) {
    console.log('CALENDAAAAAAR error');
  console.log(error.message);

      }

        console.log(JSON.stringify(req.body))
        const data = SettingsModel.checkValue(req.body)
        writeFile("./settings.json", JSON.stringify(data), 'utf-8', (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        })
        res.send(data)


          const bree = new Bree({

              logger: new Cabin(),

              jobs: [
                  // runs `./jobs/worker-9.js` every day at midnight
                  {
                      name: 'worker',
                      // interval: 'at 12:00 am',
                      cron: '* * * * *',
                      path: path.join(__dirname, 'jobs', 'cron.mjs')
                  },
              ]
          });

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
          const graceful = new Graceful({ brees: [bree] });
          graceful.listen();

          (async () => {
              await bree.stop();
          })();
// start all jobs (this is the equivalent of reloading a crontab):
          (async () => {
              await bree.start();
          })();

        return
      }
      else {
        //console.log(JSON.stringify(req.body))
       // const data = SettingsModel.checkValue(req.body)
        let settings = await readFile("./settings.json", 'utf-8', (err) => {
          if (err) throw err;
          console.log('The file has been read!');
        })
        if (settings) {
          console.log(JSON.parse(settings))
          const data = SettingsModel.checkValue(JSON.parse(settings))
          console.log(data)
          res.send(data)
          return
        }
        res.send({})

      }
      return
    }
    else if (req.url == '/api/calendar') {


      /*
            try {
              const contacts = await bitrix.getContacts({
                select: ['ID', 'NAME', 'LAST_NAME', 'EMAIL', 'PHONE'],
                order: { DATE_CREATE: 'DESC' }
              });
              res.json(contacts.result);
            } catch (error) {
              res.status(500).json({ error: error.message });
            }
            */
      /*
            import * as dotenv from 'dotenv'
            import { fileURLToPath } from 'url'
            import { dirname, resolve } from 'path'
            import * as fs from 'fs'
            import chalk from 'chalk'
            import { DateTime, Interval } from 'luxon'
            import {
              LoggerBrowser,
              Result,
              B24Hook,
              EnumCrmEntityTypeId,
              Text,
              useFormatter
            } from '@bitrix24/b24jssdk'

            const __filename = fileURLToPath(import.meta.url)
            const __dirname = dirname(__filename)

            const $logger = LoggerBrowser.build('process-company-list ', true)
            const { formatterNumber } = useFormatter()
            formatterNumber.setDefLocale('en')

      // Load environment variables from .env.local ////
            dotenv.config({ path: resolve(__dirname, '../.env.local') })

      // Retrieve the API URL from environment variables and create a B24Hook ////
            const $b24 = new B24Hook({
              b24Url: process.env.VITE_B24_HOOK_URL || '',
              userId: Text.toInteger(process.env.VITE_B24_HOOK_USER_ID),
              secret: process.env.VITE_B24_HOOK_SECRET || ''
            })
            $b24.setLogger(LoggerBrowser.build('Core', false))



      // Generate a filename with a time-based UUID ////
            const fileName = `companies-list-${Text.getUuidRfc4122()}.csv`

      // Check and create the /out directory if it does not exist ////
            const outputDir = resolve(__dirname, '../out')
            if(!fs.existsSync(outputDir))
            {
              fs.mkdirSync(outputDir, { recursive: true })
            }

      // Create a write stream to the file ////
            const filePath = resolve(outputDir, fileName)
            const writeStream = fs.createWriteStream(filePath)

            const delim = '%|%'

            const status: IStatus = {
              filePath: filePath,
              resultInfo: null,
              progress: {
                ttl: 0,
                lastId: 0
              },
              time: {
                start: null,
                stop: null,
                interval: null,
              }
            }

            const result = new Result()
            result.setData(status)

            $logger.info(chalk.green(
                '>> start >>>'
            ))

            try
            {
              status.time.start = DateTime.now()

              // Write headers to CSV ////
              writeStream.write(['Id', 'Title', 'Industry'].join(delim) + '\n')

              let generator = $b24.fetchListMethod(
                  'crm.item.list',
                  {
                    entityTypeId: EnumCrmEntityTypeId.company,
                    select: [
                      'id',
                      'title',
                      'industry'
                    ]
                  },
                  'id',
                  'items'
              )

              for await (let entities of generator)
              {
                for(let entity of entities)
                {
                  status.progress.ttl++
                  status.progress.lastId = Text.toNumber(entity.id)

                  writeStream.write([
                    entity.id,
                    entity.title,
                    entity.industry
                  ].join(delim) + '\n')
                  process.stdout.write(`\r${ chalk.grey(`>> ttl ${ status.progress.ttl } >>> lastId: ${ entity.id }`) }`)
                }
              }

              status.resultInfo = 'all done'
              process.stdout.write('\n')
            }
            catch(error)
            {
              $logger.error(error)
              result.addError(
                  (error instanceof Error)
                      ? error
                      : new Error(error as string)
            )
            }
            finally
            {
              // Measure execution time ////
              status.time.stop = DateTime.now()
              if( status.time.stop && status.time.start )
              {
                status.time.interval = Interval.fromDateTimes(status.time.start, status.time.stop)
              }

              // Close the stream after writing ////
              writeStream.end()
            }

            if(result.isSuccess)
            {
              const data: IStatus = result.getData()
              $logger.info([
                ``,
                `- file: ${chalk.green(data.filePath)}`,
                `- resultInfo: ${chalk.green(data.resultInfo)}`,
                `- ttl: ${chalk.blue(data.progress.ttl)}`,
                `- lastId: ${chalk.gray(data.progress.lastId)}`,
              ].join('\n'))
            }
            else
            {
              $logger.error(chalk.red(result.toString()))
            }

            $logger.info(chalk.green(
                `>> stop >>> ${ formatterNumber.format((status.time?.interval?.length() || 0) / 1_000) } sec`
            ))
          }

      */
    }
    //res.send('error')

     /*
      if (usePostmanMock) {
     //  console.log(error.message, `нет маршрута ${req.url} на ${backendTestServer}. Проверяем на MOCK`)
        url = backendMockServer + req.url
        axios[reqMethod](url, req.body).then((resp) => {
          console.log(resp)
          res.send(resp.data)
        }).catch((error) => {
          // Отображается в терминале
          const msg = `[TEST] нет маршрута ${req.url} на ${backendMockServer}
          Добавьте новый или измените этот маршрут`
          console.log(error.message, msg)
          res.send(msg)
        })
      } else {
        res.status(error.response.status)
        res.send(error.response.data)
      }

*/
   }
})
