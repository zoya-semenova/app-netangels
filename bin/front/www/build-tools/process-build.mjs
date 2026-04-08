import { readFile, readdir, stat } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { copy, remove } from 'fs-extra'
import { writeFileRecursive } from './writeFileRecurcive.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const resources = ['_nuxt']

const bundlePath = resolve(__dirname, '../dist')

const destPath = resolve(__dirname, '../../template')

const resourcesDest = resolve(__dirname, '../../')

const prepareTemplate = (content) => {
  let preparedContent = ''

  const headTag = '<head>'
  const bodyTag = '</body>'

  let headPosition = content.indexOf(headTag)
  headPosition += headTag.length

  preparedContent = content.substring(headPosition)

  const bodyPosition = preparedContent.indexOf(bodyTag)

  preparedContent = preparedContent.substring(0, bodyPosition)

  return preparedContent
}

const processBuild = async (dir = bundlePath) => {
  const files = await readdir(dir)
  for (const file of files) {
    const filePath = resolve(dir, file)
    if (resources.includes(file)) {
      const resourcePath = resolve(resourcesDest, file)
      await remove(resourcePath)
      await copy(filePath, resourcePath)
    } else {
      const fileStat = await stat(filePath)
      if (fileStat.isDirectory()) {
        processBuild(filePath)
      } else if (/.*\.html$/.test(file)) {
        let fileData = await readFile(filePath, 'utf8')
        fileData = prepareTemplate(fileData)
        const targetMeta = /<meta.*data-hid="target" content="([^"]+)">/
        const result = fileData.match(targetMeta)
        if (result && result.length > 1) {
          const tplPath = result[1]
          await writeFileRecursive(resolve(destPath + tplPath), fileData)
        }
      }
    }
  }
}

await processBuild()

console.log('Build processed')
