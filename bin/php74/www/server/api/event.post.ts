import { defineEventHandler, getQuery } from 'h3'
import { useBitrix24 } from '~~/server/composables/useBitrix24'
import { LoggerBrowser, EnumCrmEntityTypeId } from '@bitrix24/b24jssdk'
import type { ListPayload } from '@bitrix24/b24jssdk'
import type { BitrixCompany } from '~/types'

const $logger = LoggerBrowser.build('api/event.get/', true)

export default defineEventHandler(async (event) => {
    const { $b24 } = await useBitrix24(event, $logger)

    try {
        const response = await $b24.callMethod(
            'calendar.event.add',
            {
                type: 'user',
                ownerId: 1,
                name: 'New Event Name',
                description: 'Description for event',
                from: '2026-06-14',
                to: '2026-06-14',
                skip_time: 'Y',
                section: 17,
                color: '#9cbe1c',
                text_color: '#283033',
                accessibility: 'absent',
                importance: 'normal',
                is_meeting: 'Y',
                private_event: 'N',
                remind: [
                    {
                        type: 'min',
                        count: 20
                    }
                ],
                location: 'London',
                attendees: [1],
                host: 1,
                meeting: {
                    notify: true,
                    reinvite: false,
                    allow_invite: false,
                    hide_guests: false,
                },
                rrule: {
                    FREQ: 'YEARLY',
                    COUNT: 10,
                    INTERVAL: 1,
                },
                // crm_fields: ['C_5', 'L_11']
            }
        );

        $logger.log({
            method: 'calendar.event.add',
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
