import express from 'express'

import multer from 'multer'
import cors from 'cors'
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
