import axios from 'axios'
import { frontendBaseURL } from '../frontendBaseURL'

const isDev = process.env.NODE_ENV === 'development'

let baseURL = ''

if (isDev || typeof window === 'undefined') {
  baseURL = frontendBaseURL
}
if (process.client) {
  const siteUrlEl = document.querySelector('meta[name="site-url"]')
  if (siteUrlEl) {
    baseURL = siteUrlEl.content
  }
}

if (process.client) {
  const siteUrlEl = document.querySelector('meta[name="site-url"')
  if (siteUrlEl) {
    baseURL = siteUrlEl.content
  }
}
console.log(baseURL)
const http = axios.create({
  baseURL
})
/**
 * Base Service class
 * @property {String} namespace common url part of the Service (e.g. catalog, api)
 * @property {Boolean} isDev runtime mode
 * @property {Object} http axios instance
 */
export class ServiceT {
  /**
   * Define namespace and provide http and isDev properties for inherited instances
   */
  constructor () {
    this.namespace = ''
    this.isDev = isDev
    this.http = http
  }

  /**
   * Construct link based on current namespace and a given path
   * @param {String} path unique part of desired url
   */
  getLink (path) {
    const regex = /^http.*/
    if (regex.test(path)) {
      return path
    }
    const fullPath = [this.namespace, ...path.split('/')].filter(pathChunk => pathChunk && pathChunk !== '/')
    const link = fullPath.join('/')
    return link ? `/${link}/` : '/'
  }

  /**
   * Get method
   * @param {String} path unique part of desired url
   * @param {Object} config axios config
   */
  get = async (path, config = {}) => {
    const { data } = await this.http.get(this.getLink(path), config)
    return data
  }

  /**
   * Post method
   * @param {String} path unique part of desired url
   * @param {FormData} payload body FormData
   * @param {Object} config axios config
   */
  post = async (path, payload, config = {}) => {
    const { data } = await this.http.post(this.getLink(path), payload, config)
    return data
  }
}
