import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Notation from '../views/Notation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/notation',
    name: 'Notation',
    component: () => import('../views/Notation.vue')
  },
  {
    path: '/notation/:mode',
    name: 'Notation',
    component: () => import('../views/Notation.vue')
  },
  {
    path: '/notation/:mode/:id',
    name: 'NotationEdit',
    component: Notation,
    // component: () => import('../views/Notation.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
