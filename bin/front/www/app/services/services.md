# Services

All services are classes that extend base class Service.

## Url configuration

Urls and configuration params located in `/front_sources/src/conf.env.js`:
`frontendBaseURL` - url for frontend services, browser will make requests to this host.
`backendTestServer` - url for express. If browser make requests to local server, that server will proxy requests to this host.
`backendMockServer` - postman mock server url. It works this way: 1. local server try to make request to `backendTestServer` and 2. If it fails then (if `usePostmanMock` flag is true) make request to `backendMockServer`
`usePostmanMock` - flag to use or not postman mock server
`useLocalMocks` - you can additionaly have local mocks, this flag controls to load or not requests with them.

## Service interface

Service has inner properties that could be useful:

|Property name | Description
|--------------|-------------
|namespace     | Common part of the url, it will be placed first when constructing the url (e.g. if namespace is 'catalog' and unique url part is 'fields', result url will  '/catalog/fields/')
|isDev         | If you need to change url if mode is development, there is a flag for it.
|http          | Axios instance, in most cases you will not need it but if you do, there it is.


Service has two main methods you will work with: `get` and `post`.

`get` method takes 2 arguments: url part and config. In config you can pass the parameters in `params` field.
`post` method takes 3 arguments: url part, FormData payload and config.

Url part should not have slashes.

For example:
```javascript
  class CommonService extend Service {
    async getTabs (id) {
      return this.get('tabs', { params: { id } })
    }
    async sendFeedback (payload) {
      return this.post('feedback', payload)
    }
  }
```

You can combine services and models:

```javascript
  class CommonService extend Service {
    async getTabs (id) {
      const data = this.get('tabs', { params: { id } })
      return TabsModel.checkValue(data)
    }
  }
```

More info about models you can find in the corresponding md file.