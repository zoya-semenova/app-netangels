import {
  SET_COMPLEX,
  SET_CONTACTS,
  SET_LINKS,
  SET_MENU,
  SET_PREMISE_STATUS_LIST,
  SET_PREMISE_TYPES_LIST,
  SET_SOCIAL,
  SET_SORT_LIST,
  SET_TURNS,
  SET_SECTIONS,
  SET_TYPE_FLATS,
  SET_MASS_MEDIA
} from './mutations'
import { nuxtServerInit } from './nuxtServerInit'
import CommonService from '@/services/Common/Common.service'

//import CatalogService from '@/services/Catalog/Catalog.service'
//import { writeFile } from 'node:fs';
export const GET_LINKS = 'GET_LINKS'
export const GET_CONTACTS = 'GET_CONTACTS'

export const SET_CALENDAR = 'SET_CALENDAR'
export const GET_MENU = 'GET_MENU'
export const GET_SOCIAL = 'GET_SOCIAL'
export const GET_PREMISE_STATUS_LIST = 'GET_PREMISE_STATUS_LIST'
export const GET_PREMISE_TYPES_LIST = 'GET_PREMISE_TYPES_LIST'
export const GET_SORT_LIST = 'GET_SORT_LIST'
export const GET_TURNS = 'GET_TURNS'
export const GET_SECTIONS = 'GET_SECTIONS'
export const GET_COMPLEX = 'GET_COMPLEX'
export const GET_TYPE_FLATS = 'GET_TYPE_FLATS'
export const GET_MASS_MEDIA = 'GET_MASS_MEDIA'
export default {
  nuxtServerInit,
  async [GET_LINKS] ({ commit }) {
    const links = await CommonService.getLinks()
    commit(SET_LINKS, links)
  },
  async [GET_CONTACTS] ({ commit }) {

    const contacts = await CommonService.getContacts()
    commit(SET_CONTACTS, contacts)
   // writeFile("./settings.json", params)
   // return params
  },
  async [GET_MENU] ({ commit }) {
    const menu = await CommonService.getMenu('/')
    commit(SET_MENU, menu)
  },
  async [SET_CALENDAR] ({ commit }) {
    const calendar = await CommonService.setCalendar()
    return true
    //commit(SET_MENU, menu)
  },
  async [GET_SOCIAL] ({ commit }) {
    const { social } = await CommonService.getSocial()
    commit(SET_SOCIAL, social)
  },
  async [GET_PREMISE_STATUS_LIST] ({ commit }) {
    const statusList = await CatalogService.getPremiseStatusList()
    commit(SET_PREMISE_STATUS_LIST, statusList)
  },
  async [GET_PREMISE_TYPES_LIST] ({ commit }) {
    const typesList = await CatalogService.getPremiseTypes()
    commit(SET_PREMISE_TYPES_LIST, typesList)
  },
  async [GET_SORT_LIST] ({ commit }) {
    const { sort } = await CatalogService.getSortList()
    commit(SET_SORT_LIST, sort)
  },
  async [GET_TURNS] ({ commit }) {
    const { turn } = await CatalogService.getTurns()
    commit(SET_TURNS, turn)
  },
  async [GET_SECTIONS] ({ commit }, params) {
    const { section } = await CatalogService.getSections(params)
    commit(SET_SECTIONS, section)
  },
  async [GET_COMPLEX] ({ commit }) {
    const { complex } = await CatalogService.getComplex()
    commit(SET_COMPLEX, complex)
  },
  async [GET_LINKS] ({ commit }) {
    const links = await CommonService.getLinks()
    commit(SET_LINKS, links)
  },
  async [GET_MASS_MEDIA] ({ commit }) {
    const data = await CommonService.getMassMedia()
    commit(SET_MASS_MEDIA, data)
  },
  async [GET_TYPE_FLATS] ({ commit }) {
    const { list } = await CatalogService.getPremises({
      statusId: [1],
      viewId: [1],
      group: ['typeId']
    })
    commit(SET_TYPE_FLATS, list)
  }
}
