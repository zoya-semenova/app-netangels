<script setup lang="ts">
import HrAutomationIcon from '@bitrix24/b24icons-vue/main/HrAutomationIcon'
import UserCompanyIcon from '@bitrix24/b24icons-vue/common-b24/UserCompanyIcon'
import PersonIcon from '@bitrix24/b24icons-vue/main/PersonIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/main/SettingsIcon'
import CompanyIcon from '@bitrix24/b24icons-vue/outline/CompanyIcon'
import * as z from 'zod'
import type { FormSubmitEvent } from '@bitrix24/b24ui-nuxt'

import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'

import type { BitrixCompany } from '~/types'
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'

import { ref } from 'vue'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import type { SelectItem } from '@bitrix24/b24ui-nuxt'


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
    icon: SettingsIcon,
    slot: 's1'
  },
  {
    label: 'Сотрудники',
    icon: PersonIcon,
    slot: 's2'
  },
]

const wholivefeedItems = ref<SelectItem[]>([
  {
    label: 'Отдел',
    value: 'department'
  },
  {
    label: 'Компания',
    value: 'company'
  },
]);

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
  wholivefeed: z.any().refine(value => value, {

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

  console.log('response')
  console.log(settings)

  console.log('Created element with ID:', Result);
}

async function onCalendar() {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(state)
  isShowResult.value = true

  const calendar  = await CommonServiceT.saveCalendar({ ...state })

  console.log('response')
  console.log(calendar)

  console.log('Created element with ID:', Result);
}

async function onEvent() {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(state)
  isShowResult.value = true

  const event  = await CommonServiceT.saveEvent({ ...state })

  console.log('response')
  console.log(event)

  console.log('Created element with ID:', Result);
}

async function onChat() {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(state)
  isShowResult.value = true

  const chat  = await CommonServiceT.saveChat({ ...state })

  console.log('response')
  console.log(chat)

  console.log('Created element with ID:', Result);
}

async function onBot() {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'air-primary-success' })
  console.log(state)
  isShowResult.value = true

  const bot  = await CommonServiceT.saveBot({ ...state })

  console.log('response')
  console.log(bot)

  console.log('Created element with ID:', Result);
}

const { loggedIn, user, session, clear: clearSession } = useUserSession()
console.log('loggedIn index')
console.log(loggedIn)
//const $logger = LoggerBrowser.build('OAut.index', true)
const isInit = ref(false)

onMounted(async () => {
  isInit.value = true
})

onMounted(() => {
  $logger.info({
    user: user.value,
    session: session.value
  })
})

// const { data: departments, status } = await useFetch('/api/departments', {
//   key: 'typicode-users',
//   transform: (data: { id: number, name: string }[]) => {
//     return data?.map(department => ({
//       label: department.name,
//       value: String(department.id),
//     }))
//   },
//   lazy: true,
//   onRequestError({ request }) { console.warn('[fetch request error]', request) }
// })

const B24Badge = resolveComponent('B24Badge')

type Employee = {
  id: number
  birthday: string
  name: string
  departments: string
}

type Department = {
  ID: number
  NAME: string
}

const page = ref(1)
const hasMore = ref(true)
const isInited = ref(false)
const loading = ref(false)
const total = ref(0)
const error = ref<string | null>(null)
const employees = ref([])
const departments = ref([])
const selectFilters = ref([])

const loadMore = async () => {
  if (!hasMore.value) return

  try {
    loading.value = true
    error.value = null

    const response = await $fetch<{
      list: Employee[]
    }>('/api/employees', {
      method: 'GET',
      query: { department:  selectFilters.value.value}
    })

    if (response) {
      employees.value = [...response.list]
    //   const data = ref<Employee[]>([{id:1,name:'2',birthday:'3'}])

      console.log(employees)
    }
  } catch (err) {
    error.value = 'Failed to load employees'
    console.error('Error:', err)
  } finally {
    loading.value = false
    isInited.value = true
  }

}

try {
  const response = await $fetch<{
    list: Department[]
  }>('/api/departments', {
    method: 'GET',
    query: { }
  })

  const data = response.list?.map((user) => ({
    label: user.NAME,
    value: String(user.ID),
  })) || [];
  console.log(data)
  if (data) {
    departments.value = [...departments.value, ...data]
    //   const data = ref<Employee[]>([{id:1,name:'2',birthday:'3'}])

    console.log(departments)
  }
} catch (err) {
  error.value = 'Failed to load departments'
  console.error('Error:', err)
} finally {

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
    accessorKey: 'birthday',
    header: 'День рождения',
    cell: ({ row }) => {
      return row.getValue('birthday') ?
          new Date(row.getValue('birthday')).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour12: false
      }) : 'не заполнен'
    }
  },
  {
    accessorKey: 'name',
    header: 'Имя'
  },
  {
    accessorKey: 'departments',
    header: 'Отдел'
  },
]

const table = useTemplateRef('table')

const columnFilters = ref([
  {
    id: 'name',
    value: ''
  },
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

        <B24FormField name="livefeed" label="Текст поздравления" >
          <B24Textarea v-model="state.textarea" :cols="20" placeholder="" class="w-80" />
        </B24FormField>

        <B24FormField name="livefeed" label="Время отправки поздравления">
          <B24InputNumber v-model="state.timelivefeed" :default-value="24"  class="w-24"/>
        </B24FormField>

        <B24FormField name="livefeed" label="За сколько дней до события создавать поздравление">
          <B24InputNumber v-model="state.daylivefeed" :default-value="0"  class="w-24"/>
        </B24FormField>

        <B24FormField name="livefeed" label="Кто будет видеть (отделы и пользователи)">
            <B24Select v-model="state.wholivefeed" :items="wholivefeedItems" class="w-80" />
        </B24FormField>

      <B24FormField name="chat">
        <B24Switch v-model="state.chat" label="Создавать чат" />
      </B24FormField>
      <div>
        <B24FormField name="text-chat" label="Текст для чата">
          <B24Textarea v-model="state.textchat" placeholder=""  class="w-80"/>
        </B24FormField>
      </div>
        <B24Button type="submit" label="Сохранить" color="air-primary-success" />
        <div>
        <B24Button class="" @click="onCalendar" label="Календарь" color="air-primary-success" />
        </div>
        <div>
          <B24Button class="" @click="onEvent" label="Событие" color="air-primary-success" />
        </div>
        <div>
          <B24Button class="" @click="onChat" label="Чат" color="air-primary-success" />
        </div>
        <div>
          <B24Button class="" @click="onBot" label="Бот" color="air-primary-success" />
        </div>
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
            <B24SelectMenu
                :items="departments"
                v-model="selectFilters"
                :loading="status === 'pending'"

                placeholder="Отдел"
                class="w-[192px]"
                @update:model-value="loadMore"
            >
            </B24SelectMenu>

<!--          <B24Input-->
<!--              :model-value="table?.tableApi?.getColumn('name')?.getFilterValue() as string"-->
<!--              class="max-w-[300px]"-->
<!--              placeholder="Filter names..."-->
<!--              @update:model-value="table?.tableApi?.getColumn('name')?.setFilterValue($event)"-->
<!--          />-->
        </template>
        <B24Table ref="table" v-model:column-filters="columnFilters" :data="employees" :columns="columns" />
      </B24Card>
    </template>
  </B24Tabs>
  </B24App>
  </div>
</template>