import express from 'express'

import multer from 'multer'
import cors from 'cors'

//import * as ttt from './api/companies.get'

import {
    frontendBasePort,
    frontendBaseURL,
    generateFrontBaseUrl
} from '../generateFrontUrl.mjs'

generateFrontBaseUrl()

const corsConfig = {
    origin: '*'
}

export const server = express()
export const upload = multer()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(upload.array())
server.use(cors(corsConfig))

server.listen(frontendBasePort, () => {
    console.log(
        `Server listening on ${frontendBaseURL}`
    )
})

import axios from 'axios'
import File from 'file-class'
import {
    backendTestServer,
    backendMockServer,
    usePostmanMock
} from '../conf.env.mjs'
//import SettingsModel from "./services/Common/Models/Settings.model.js";

import { writeFile } from 'fs/promises'
import { readFile } from 'fs/promises'

//import * as ttt from './src/process-company-list'

console.log(usePostmanMock)

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
/*
// Let's describe the work status interface ////
interface IStatus {
  filePath: string,
      resultInfo: null|string,
      progress: {
    ttl: number,
        lastId: number
  },
  time: {
    start: null|DateTime,
        stop: null|DateTime,
        interval: null|Interval
  }
}
*/


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

                //console.log(JSON.stringify(req.body))
                // const data = SettingsModel.checkValue(req.body)
            //    ttt


            return
        }
        else if (req.url == '/api/calendar') {
            console.log('ttt')

            const { data } = await axios.get('http://127.0.0.1:3000/api/hello')
           // const { data } = await this.get('http://80.87.102.36:3000/api/hello')
         //   const t = ttt
res.send(data)
            return
        }
        //res.send('error')
return

    }

})


