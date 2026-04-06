import { defineEventHandler, getQuery } from 'h3'
import { useBitrix24 } from '~~/server/composables/useBitrix24'
import { LoggerBrowser, EnumCrmEntityTypeId } from '@bitrix24/b24jssdk'
import type { ListPayload } from '@bitrix24/b24jssdk'
import type { BitrixCompany } from '~/types'

const $logger = LoggerBrowser.build('api/chat.get/', true)

export default defineEventHandler(async (event) => {
    const { $b24 } = await useBitrix24(event, $logger)

    try {
        const response = await $b24.callMethod(
            'im.chat.add',
            {
                USERS: [1],
                TYPE: 'CHAT',
                TITLE: 'Чат birthday',
                DESCRIPTION: 'Здесь обсуждаем birthday',
                COLOR: 'PINK',
                MESSAGE: 'birthday',
                ENTITY_TYPE: 'CHAT',
                // ENTITY_ID: 'DEAL|260',
                BOT_ID: 16
            },
        );

        $logger.log({
            method: 'im.chat.add',
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
