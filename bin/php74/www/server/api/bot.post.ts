import { defineEventHandler, getQuery } from 'h3'
import { useBitrix24 } from '~~/server/composables/useBitrix24'
import { LoggerBrowser, EnumCrmEntityTypeId } from '@bitrix24/b24jssdk'
import type { ListPayload } from '@bitrix24/b24jssdk'
import type { BitrixCompany } from '~/types'

const $logger = LoggerBrowser.build('api/bot.get/', true)

export default defineEventHandler(async (event) => {
    const { $b24 } = await useBitrix24(event, $logger)

    try {
        const response = await $b24.callMethod(
            'imbot.register',
            {
                CODE: 'birthdaybot',
                TYPE: 'B',
                EVENT_HANDLER: 'https://vm-ad77e947.na4u.ru/api/bot/events',
                OPENLINE: 'N',
                PROPERTIES: {
                    NAME: 'birthdaybot',
                    WORK_POSITION: 'birthdaybot',
                },
            },
        );

        $logger.log({
            method: 'imbot.register',
        })

        const data = response.getData()

        const list = data.result

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
