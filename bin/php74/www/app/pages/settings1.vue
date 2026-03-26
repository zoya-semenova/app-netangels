<script setup lang="ts">
import HrAutomationIcon from '@bitrix24/b24icons-vue/main/HrAutomationIcon'
import UserCompanyIcon from '@bitrix24/b24icons-vue/common-b24/UserCompanyIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import CompanyIcon from '@bitrix24/b24icons-vue/outline/CompanyIcon'
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

import type { BitrixCompany } from '~/types'
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'


import { ref } from 'vue'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'

import {
//  initializeB24Frame,
  LoggerBrowser,
  // B24Frame,
  Result,
  EnumCrmEntityTypeId,
  Text,
  type ISODate
} from '@bitrix24/b24jssdk'



useHead({
  title: 'Bitrix24 UI - Login'
})

definePageMeta({
  middleware: ['auth']
})

const toast = useToast()

const $logger = LoggerBrowser.build('Auth.step1', true)
const b24Url = ref('https://b24x5.t3.ipg.digital/')
export interface ExampleProps {
  title?: string
}

withDefaults(defineProps<ExampleProps>(), {
  title: 'Heads up!'
})

// definePageMeta({
//   layout: 'default'
// })


const items = [
  {
    label: 'Дни рождения',
    icon: PersonIcon,
    slot: 's1'
  },
  {
    label: 'Сотрудники',
    icon: PersonIcon,
    slot: 's2'
  },
]
const schema = z.object({
  input: z.string().min(10),
  inputNumber: z.number().min(10),
  inputMenu: z.any().refine(option => option?.value === 'option-2', {
    message: 'Select Option 2'
  }),
  inputMenuMultiple: z.any().refine(values => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Include Option 2'
  }),
  textarea: z.string().min(10),
  select: z.string().refine(value => value === 'option-2', {
    message: 'Select Option 2'
  }),
  selectMenu: z.any().refine(option => option?.value === 'option-2', {
    message: 'Select Option 2'
  }),
  selectMenuMultiple: z.any().refine(values => !!values?.find((option: any) => option.value === 'option-2'), {
    message: 'Include Option 2'
  }),
  chat: z.boolean().refine(value => value === true, {

  }),
  textchat: z.string().refine(value => value === true, {

  }),
  wholivefeed: z.any().refine(value => value === true, {

  }),
  daylivefeed: z.number().min(0).max(30),
  livefeed: z.boolean().refine(value => value === true, {

  }),
  radioGroup: z.string().refine(value => value === 'option-2', {
    message: 'Select Option 2'
  }),
  range: z.number().max(20, { message: 'Must be less than 20' }),
  timelivefeed: z.number().min(0).max(24)
})

type Schema = z.input<typeof schema>

const  settings  = await CommonService.getSettings()
console.log(settings)
const state1 = reactive<Partial<Schema>>({
  chat: undefined,
  textchat: undefined,
  textarea: undefined,
  wholivefeed: undefined,
  daylivefeed: undefined,
  timelivefeed: undefined,
  livefeed: undefined
})
const state = reactive<Partial<Schema>>(settings)


import {
  GET_CONTACTS

} from '~/store/actions'
//import store from '~/store'

//const $logger = LoggerBrowser.build('MyApp', import.meta.env?.DEV === true)
//let $b24: B24Frame

import axios from 'axios'
import CommonService from '@/services/Common/Common.service'
import CommonServiceT from '@/services/Common/CommonT.service'
//import CommonService from '@/services/Common/Common.service'

const isShowResult = ref(false)
//const toast = useToast()
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(state)
  isShowResult.value = true

  const  settings  = await CommonService.saveSettings({ ...state })


  //const { user } = useUserSession()

  // const { calendar } = await axios.get('http://80.87.102.36:3000/api/hello')
  // console.log(calendar)

  try {
    // isInited.value = false
    // error.value = null

    const hello = await $fetch('/api/hello', {
      method: 'GET',
      query: { //count: count
         }
    })
    console.log(hello)
  } catch (err) {
    // error.value = 'Failed to add employees'
    console.error('Error:', err)
  }


  // const calendar = await CommonServiceT.getSettings({ ...state })
 // const calendar = await this.get("http://80.87.102.36:3003/api/calendar")

  //const  settings  = await CommonService.saveSettings({ ...state })
  //const settings = await this.post("http://80.87.102.36:3002/api/settings", { ...state })
  //const settings = await
 // const settings = await dispatch(GET_CONTACTS)

  // await (`${GET_CONTACTS}`, {
  //   limit: [newsLimit],
  //   page: [1]
  // })
  console.log('response')
  console.log(settings)
  //commit(SET_SORT_LIST, settings)
  //state.settings = settings
  //this.$emit('fields-change', { field, count, seo })


  // initializeB24Frame()
  //     .then((response: B24Frame) => {
  //       $b24 = response

        /*
        $b24.callMethod(
            'calendar.section.add',
            {
              type: 'user',
              ownerId: 1,
              name: 'New Section',
              description: 'Description for section',
              color: '#9cbeee',
              text_color: '#283000',
              export: {
                ALLOW: false,
                SET: '3_9'
              }
            }
        );
  */
        /*
        return $b24.callBatch({
          CompanyList: {
            method: 'calendar.section.add',
            params: {
              type: 'user',
              ownerId: 1,
              name: 'New Section',
              description: 'Description for section',
              color: '#9cbeee',
              text_color: '#283000',
              export: {
                ALLOW: false,
                SET: '3_9'
              }
            }
          }
        }, true )
*/
      // })
      // .then((response: Result) => {
      //  const result = response.getData().result;
        console.log('Created element with ID:', Result);
        /*
        const employees = response.getData()
        const employeesList = (employees.CompanyList.items || []).map((item: any) => {
          return {
            id: Number(item.id),
            title: item.title,
            createdTime: Text.toDateTime(item.createdTime as ISODate)
          }
        })

        $logger.info('response >> ', employeesList)
        */
        // $logger.info('load >> stop ')
      // })
      // .catch((error) => {
      //   $logger.error(error)
      // })
}

const { loggedIn, user, session, clear: clearSession } = useUserSession()
console.log('loggedIn index')
console.log(loggedIn)
//const $logger = LoggerBrowser.build('OAut.index', true)
const isInit = ref(false)
const crmListShow = ref(false)

onMounted(async () => {
  isInit.value = true
})

const makeOpenSliderForUser = () => {
  window.open(
      `${user.value?.bitrix24?.targetOrigin}/company/personal/user/${user.value?.bitrix24?.id}/`
  )

  return Promise.resolve()
}

const makeCrmListShow = () => {
  crmListShow.value = true
}

async function logout() {
  isInit.value = false
  await clearSession()
  await navigateTo('/auth')
}

onMounted(() => {
  $logger.info({
    user: user.value,
    session: session.value
  })
})

async function goToB24() {

}

import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'

const B24Badge = resolveComponent('B24Badge')

type Employee = {
  id: string
  date: string
  email: string
}

const employees = ref<Employee[]>([])
const page = ref(1)
const hasMore = ref(true)
const isInited = ref(false)
const loading = ref(false)
const total = ref(0)
const error = ref<string | null>(null)

const loadMore = async () => {
  if (!hasMore.value) return

  try {
    loading.value = true
    error.value = null

    const response = await $fetch<{
      nextPage: number | null
      list: BitrixCompany[]
      total: number
    }>('/api/employees', {
      method: 'GET',
      query: { page: page.value }
    })

    if (response) {
      employees.value = [...employees.value, ...response.list]
      hasMore.value = !!response.nextPage
      page.value = response.nextPage || page.value
      total.value = response.total
    }
  } catch (err) {
    error.value = 'Failed to load employees'
    console.error('Error:', err)
  } finally {
    loading.value = false
    isInited.value = true
  }
}

onMounted(loadMore)

defineExpose({
  loadMore
})

const columns: TableColumn<Employee>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
]

const table = useTemplateRef('table')

const columnFilters = ref([
  {
    id: 'email',
    value: 'james'
  }
])
</script>

<template>
  <div  style="padding: 100px;">
  <B24App>
  <B24Tabs :items="items" size="lg" class="w-full" > 
    <template #s1="{ item }">
      <B24Form
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <B24FormField name="livefeed">
        <B24Switch v-model="state.livefeed" label="Отправлять поздравление в ленту компании" />
      </B24FormField>
      <div >
        <B24FormField name="livefeed" label="Текст поздравления">
          <B24Textarea v-model="state.textarea" placeholder="" />
        </B24FormField>
        <B24FormField name="livefeed" label="Время отправки поздравления">
          <B24InputNumber v-model="state.timelivefeed" :default-value="24" />
        </B24FormField>
        <B24FormField name="livefeed" label="За сколько дней до события создавать поздравление">
          <B24InputNumber v-model="state.daylivefeed" :default-value="0" />
        </B24FormField>
        <B24FormField name="livefeed" label="Кто будет видеть (отделы и пользователи)">
          <B24Input v-model="state.wholivefeed"  />
        </B24FormField>
      </div>
      <B24FormField name="chat">
        <B24Switch v-model="state.chat" label="Создавать чат" />
      </B24FormField>
      <div>
        <B24FormField name="text-chat" label="Текст для чата">
          <B24Textarea v-model="state.textchat" placeholder="" />
        </B24FormField>
      </div>
        <B24Button type="submit" label="Submit" color="air-primary-success" />
      </B24Form>
    </template>
    <template #s2="{ item }">
      <B24Card
          variant="outline"
          class="flex-1 w-full"
          :b24ui="{
      header: 'p-[12px] px-[14px] py-[14px] sm:px-[14px] sm:py-[14px]',
      body: 'p-0 sm:px-0 sm:py-0',
      footer:
        'p-[12px] px-[14px] py-[14px] sm:px-[14px] sm:py-[14px] text-(length:--ui-font-size-xs) text-(--b24ui-typography-legend-color)'
    }"
      >
        <template #header>
          <B24Input
              :model-value="table?.tableApi?.getColumn('email')?.getFilterValue() as string"
              class="max-w-[300px]"
              placeholder="Filter emails..."
              @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
          />
        </template>
        <B24Table ref="table" v-model:column-filters="columnFilters" :employees="employees" :columns="columns" />
      </B24Card>
    </template>
  </B24Tabs>
  </B24App>
  </div>
</template>