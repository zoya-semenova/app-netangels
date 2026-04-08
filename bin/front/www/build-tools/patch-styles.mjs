/* eslint-disable no-template-curly-in-string */
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFile, writeFile } from 'fs/promises'
import exists from 'fs.promises.exists'

const __dirname = dirname(fileURLToPath(import.meta.url))

const packageName = 'extract-css-chunks-webpack-plugin'
const filePath = resolve(__dirname, '../node_modules', packageName, 'dist/index.js')

const replaceFrom = 'if(supportsPreload) {\', Template.indent([\'var execLinkTag = document.createElement("link");\', `execLinkTag.href =  ${mainTemplate.requireFn}.p + ${linkHrefPath};`, \'execLinkTag.rel = "stylesheet";\', \'execLinkTag.type = "text/css";\', \'document.body.appendChild(execLinkTag);\']), \'}\']), \'}));\']), \'}\']);'
const replaceTo = 'if(supportsPreload) {\', Template.indent([`var href = ${mainTemplate.requireFn}.p + ${linkHrefPath};`, \'if (!document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {\', Template.indent([\'var execLinkTag = document.createElement("link");\', `execLinkTag.href =  ${mainTemplate.requireFn}.p + ${linkHrefPath};`, \'execLinkTag.rel = "stylesheet";\', \'execLinkTag.type = "text/css";\', \'document.body.appendChild(execLinkTag);\']), \'}\']), \'}\']), \'}));\']), \'}\']);'

const fileExists = await exists(filePath)

if (fileExists) {
  let content = await readFile(filePath, 'utf-8')
  content = content.replace(replaceFrom, replaceTo)
  await writeFile(filePath, content, 'utf-8')
}
