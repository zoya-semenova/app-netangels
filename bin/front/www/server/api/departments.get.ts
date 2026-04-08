import { defineEventHandler, getQuery } from 'h3'
import { useBitrix24 } from '~~/server/composables/useBitrix24'
import { LoggerBrowser, EnumCrmEntityTypeId } from '@bitrix24/b24jssdk'
import type { ListPayload } from '@bitrix24/b24jssdk'
import type { BitrixCompany } from '~/types'

const $logger = LoggerBrowser.build('api/departments.get/', true)

export default defineEventHandler(async (event) => {
  const { $b24 } = await useBitrix24(event, $logger)

  const { page } = getQuery(event)
  const pageNumber = Number.parseInt(page as string) || 1
  const start = (pageNumber - 1) * 50

  try {
    const response = await $b24.callMethod(
      'department.get',
      {

      }
    )

    $logger.log({
      method: 'department.get',
      page,
      start
    })

    const data = response.getData()

    const list = data.result
    const time = data.time

    $logger.log({
      list
    })

    return {
      list,
    }
  } catch (error) {
    $logger.error('Bitrix24 Error:', error)

    throw createError({
      statusCode: 500,
      message: 'Error from Bitrix24'
    })
  }
})
