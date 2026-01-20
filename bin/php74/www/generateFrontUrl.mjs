import fs from 'fs/promises'
import getPort, { portNumbers } from 'get-port'

const port = await getPort({ port: portNumbers(3002, 4000) })

export const frontendBasePort = port
 //export const frontendBaseURL = `http://127.0.0.1:${port}`
export const frontendBaseURL = `https://vm-ad77e947.na4u.ru:${port}`

export const generateFrontBaseUrl = async () => {
  const data = `export const frontendBaseURL = '${frontendBaseURL}'`
  await fs.writeFile('./frontendBaseURL.js', data)
}
