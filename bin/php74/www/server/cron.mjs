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


import {
  initializeB24Frame,
  LoggerBrowser,
  B24Frame,
  Result,
  EnumCrmEntityTypeId,
  Text
} from '@bitrix24/b24jssdk'
console.log(usePostmanMock)

const bitrix = new Bitrix24API();
const checkUrlValidity = url => url.slice(-1) !== '/'

if (!checkUrlValidity(backendTestServer) || !checkUrlValidity(backendMockServer)) {
  throw new Error('Invalid url in conf.env, remove slash at the end')
}

const buildEnv = process.env.BUILD
const backendURL = process.env.CONTENT_URL || backendTestServer

console.log('Запуск cron-tab');
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";




