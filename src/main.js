import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'
import Vum from './vum.js'

// demos
import Index from './template/Index'
import List from './template/List'
import Page from './template/Page'

Vue.config.debug = true

Vue.use(Router)
Vue.use(Vum)
Vue.use(require('vue-resource'))
Vue.use(require('vue-localstorage'))

let App = Vue.extend()

let router = new Router()

router.map({
  '/': {
    name: 'index',
    component: Index
  },
  '/na': {
    name: 'na',
    component: List
  },
  '/digest': {
    name: 'digest',
    component: List
  },
  '/details': {
    name: 'details',
    component: Page
  }
})

router.start(App, '#app')

Vum.router(router)

FastClick.attach(document.body)
