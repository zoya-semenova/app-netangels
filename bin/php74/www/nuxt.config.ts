import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  /**
   * @memo App work under frame
   * Nuxt DevTools: Failed to check parent window
   * SecurityError: Failed to read a named property '__NUXT_DEVTOOLS_DISABLE__' from 'Window'
   */

  target: 'server',
  server: {
    host: '0.0.0.0', // или '0.0.0.0'
  },
  watchers: {
    webpack: {
      poll: true // Enables polling for file changes
    }
  },

  devtools: { enabled: true },

  modules: [
    '@bitrix24/b24ui-nuxt',
    `@bitrix24/b24jssdk-nuxt`,
    '@nuxt/eslint',
    'nuxt-auth-utils'

  ],
  runtimeConfig: {
    // @todo remove this wait PR https://github.com/atinux/nuxt-auth-utils/pull/409
    oauth: {
      bitrix24: {
        clientId: process.env.NUXT_OAUTH_BITRIX24_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_BITRIX24_CLIENT_SECRET,

      }
   },
    session: {
      name: 'nuxt-session',
      password: process.env.NUXT_SESSION_PASSWORD || '',
      cookie: {
        sameSite: 'strict',
        secure: false
      }
    }
  },
  alias: {
    // @todo Wait PR https://github.com/atinux/nuxt-auth-utils/pull/409
    'nuxt-auth-utils-runtime': './node_modules/nuxt-auth-utils/dist/runtime/server/lib/utils.js'
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
    disableTransition: true
  },

  css: ['~/assets/css/main.css'],

  //ssr: false,
/*
  vite: {
    server: {
      // allow incoming requests from this host
      allowedHosts: [
        'simple-firm-possum.ngrok-free.app',
        'dotingly-prospering-hawfinch.cloudpub.ru'
      ],
      // and don't forget CORS, if needed:
      cors: true
    },
    plugins: [
      tailwindcss()
    ]
  },
*/
  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27',

  nitro: {
    imports: {
      dirs: [
        'server/utils/**/*'
      ]
    },
    devProxy: {
      '/sw.js': { target: '/sw.js' }
    }
  }
})