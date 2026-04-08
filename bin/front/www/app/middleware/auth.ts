import {sendRedirect} from "h3";
import {withQuery} from "ufo";

export default defineNuxtRouteMiddleware(async (to, from) => {
 console.log('defineNuxtRouteMiddleware')

    const ignorePathList = ['/dev-sw.js', ]

    // if (ignorePathList.some(path => event.node.req.url?.startsWith(path))) {
    //     return send(event, null, '404')
    // }
    //
   const auth = useState('nuxt-auth-state')
   console.log(auth)
/*
    const sessionState = await useRequestFetch()("/api/_auth/session", {
        headers: {
            accept: "application/json"
        },
        retry: false
    }).catch(() => null);
    console.log('sessionState middle')
    console.log(sessionState)
*/
    // const user = useUserStore()
    // console.log(user)

    // if ( to.path != '/auth/bitrix24') {

   //  const user = useUserStore()
    // console.log(user)
    // const session =
    //     await getUserSession(event)
    // console.log('loggedIn')
   // console.log(session)

    // const user = useUserStore()
    // console.log(user)

    // const { fetch: fetchUserSession } = useUserSession()
    // console.log(fetchUserSession)

    const { loggedIn, user, session, clear: clearSession } = useUserSession()
    console.log('loggedIn middle')
    console.log(loggedIn)
    console.log('user middle')
    console.log(user)
    console.log('session middle')
    console.log(session)
    console.log(to.path)
    console.log(to.query)

    if (!loggedIn.value && (to.query?.code)
        && (to.path != '/auth/bitrix24')) {
       // return navigateTo('/auth/bitrix24')
        const b24Url = 'https://b24x5.t3.ipg.digital/'
        const queryUrl = new URL(b24Url)
        // return navigateTo({
        // return navigateTo({
        //     path: '/auth/bitrix24',
        //     query:to.query
        // }, {
        //     external: false
        // })

console.log('post')
console.log(to.query)
        //const data = await axios.post('http://80.87.102.36:3000/auth/bitrix24', to.query)
        return navigateTo({
            path: '/auth/bitrix24',
            query: to.query
        }, {
            external: true
        })
//console.log(data)
  //      return
    }
    if (!loggedIn.value && to.path != '/auth') {
        return navigateTo('/auth')
    }
    // if (!loggedIn.value && to.path == '/auth') {
    //     return navigateTo('/')
    // }
    if (loggedIn.value && to.path == '/auth') {
        return navigateTo('/')
    }

    // else if (!loggedIn.value && to.path != '/auth') {
    //
    // }
    // return navigateTo({
    //     path: '/'
    //
    // }, {
    //     external: false
    // })
    // if ((to.query?.code)
    //     && (to.path == '/auth/bitrix24')) {
    //     return navigateTo({
    //             path: to.query.redirect_uri+''
    //         }, {
    //             external: false
    //         })
    // }
    //
    // return navigateTo({
    //     path: '/'
    //
    // }, {
    //     external: false
    // })
 // }


//})
// export default defineNuxtRouteMiddleware((to, from) => {
 // Здесь проверяем условие авторизации (например, из пиньи)
  // const user = useAuthStore()
  // if (!user.isLoggedIn) {
   // Для редиректа используем navigateTo
    // return navigateTo('/login')
  // }
})