import store from 'store'
import Vue from 'vue/dist/vue.common.js'
import SirenClient from './client/siren-client'
import * as components from './client/components'

const client = new SirenClient()

const app = new Vue({
  el: '#app',
  data: {
    lastHref: store.get('lastHref'),
    error: null,
    entity: null,
    client: client
  },
  components: components,
  methods: {
    refresh () {
      console.log('refresh', this.lastHref)
      client.get(this.lastHref)
    },
    follow (link) {
      console.log('follow', link)
      client.follow(link)
    },
    submit (action, data) {
      console.log('action', action, data)
      client.submit(action, data)
    },
    start (url) {
      console.log('start', url)
      client.get(url)
    }
  }
})

client.on('error', error => {
  console.error(error)
  app.error = error
})

client.on('entity', (entity, href) => {
  console.log('entity', entity, href)
  app.entity = entity
  app.lastHref = href
  store.set('lastHref', href)
})
