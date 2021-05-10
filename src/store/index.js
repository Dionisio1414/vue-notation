import Vue from 'vue'
import Vuex from 'vuex'
import { appLocalStorage } from '../services/app-storage/app-storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notations: [
      { title: 'Notation 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, incidunt officia praesentium accusantium cum inventore voluptatum maxime nisi neque eos consectetur molestiae mollitia ex, unde asperiores dolorum dignissimos temporibus? Rem.' },
      { title: 'Notation 2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, incidunt officia praesentium accusantium cum inventore voluptatum maxime nisi neque eos consectetur molestiae mollitia ex, unde asperiores dolorum dignissimos temporibus? Rem.' },
      { title: 'Notation 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, incidunt officia praesentium accusantium cum inventore voluptatum maxime nisi neque eos consectetur molestiae mollitia ex, unde asperiores dolorum dignissimos temporibus? Rem.' }
    ]
  },
  mutations: {
    INIT_NOTATIONS(state) {
      if(appLocalStorage.getItem('notations')) 
        state.notations = appLocalStorage.getItem('notations')
      else 
        appLocalStorage.setItem('notations', state.notations)
    },
    DELETE_NOTATION_ITEM(state, payload) {
      const idx = state.notations.findIndex((item, index) => index === payload)
      const newArray = [
        ...state.notations.slice(0, idx),
        ...state.notations.slice(idx + 1)
      ]
      state.notations = newArray
      appLocalStorage.setItem('notations', state.notations)
    },
    CREATE_NOTATION_ITEM(state, payload) {
      state.notations.unshift(payload)
      appLocalStorage.setItem('notations', state.notations)
    },
    EDIT_NOTATION_ITEM(state, { index, data }) {
      let currentItemIdx = state.notations.findIndex((item, idx) => idx === index)
      let currentItem = { ...state.notations[currentItemIdx] } 
      currentItem = { ...data }
      state.notations.splice(index, 1, currentItem)
      appLocalStorage.setItem('notations', state.notations)
    }
  },
  actions: {
    initNotations({ commit }) {
      commit('INIT_NOTATIONS')
    },
    deleteNotationItem({ commit }, payload) {
      commit('DELETE_NOTATION_ITEM', payload)
    },
    createNotationItem({ commit }, payload) {
      commit('CREATE_NOTATION_ITEM', payload)
    },
    editNotationItem({ commit }, payload) {
      commit('EDIT_NOTATION_ITEM', payload)
    }
  },
  getters: {
    getNotationList: s => s.notations
  }
})
