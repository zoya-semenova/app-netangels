import { defineEventHandler, getQuery } from 'h3'
import { useBitrix24 } from '~~/server/composables/useBitrix24'
import { LoggerBrowser, EnumCrmEntityTypeId } from '@bitrix24/b24jssdk'
import type { ListPayload } from '@bitrix24/b24jssdk'
import type { BitrixCompany } from '~/types'

const $logger = LoggerBrowser.build('api/employees.get/', true)

export default defineEventHandler(async (event) => {
  const { $b24 } = await useBitrix24(event, $logger)

  // const { page } = getQuery(event)
  const query = getQuery<{
    department?: number
  }>(event)
  // const pageNumber = Number.parseInt(page as string) || 1
  // const start = (pageNumber - 1) * 50

  try {
    const response = await $b24.callMethod(
      'im.department.employees.get',
      {
        ID: [query.department?query.department:3],
        USER_DATA: 'Y'
      }
    )

    $logger.log({
      method: 'im.department.employees.get',
      // page,
      // start
    })

    type Employee = {
      id: string,
      birthday: string,
      email: string,
      departments: array
    }
    const data = response.getData()

    const list = data.result[query.departments?query.departments.join(' '):'']
    const time = data.time

    $logger.log({
      list
    })

    try {
      const response = await $b24.callMethod(
          'department.get',
          {
          }
      )

      const data = response.getData()

      const departments = data.result

      $logger.log({
        departments
      })

      const mapDepartments = Object.fromEntries(departments.map(dep => [dep.ID, dep]));
      console.log(mapDepartments);console.log('mapDepartments')

      return  {'list': list.map(user => ({
        ...user,
      departments: user.departments.map(dep =>
          mapDepartments[dep].NAME
        )
      }))};

    } catch (error) {
      $logger.error('Bitrix24 Error:', error)

      throw createError({
        statusCode: 500,
        message: 'Error from Bitrix24'
      })
    }

  } catch (error) {
    $logger.error('Bitrix24 Error:', error)

    throw createError({
      statusCode: 500,
      message: 'Error from Bitrix24'
    })
  }
})
