/** @format */

// import { login, getInfo } from '@/api/login'
import { Message } from 'element-ui'
import router from '@/router'
import { $apis } from '@helper'

const state = {
  token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '', // 认证凭证'
  userName: '',
  roles: [],
  introduce: ''
}
const mutations = {
  SET_TOKEN(state, val) {
    state.token = val
    sessionStorage.setItem('token', val)
  },
  DEL_TOKEN(state) {
    state.token = ''
    state.userName = ''
    state.roles = ''
    state.introduce = ''
    sessionStorage.removeItem('token')
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_NAME(state, payload) {
    state.userName = payload
  },
  SET_INTRODUCE(state, payload) {
    state.introduce = payload
  }
}
const actions = {
  // user login
  login({ commit }, formdatas) {
    return new Promise((resolve, reject) => {
      return $apis.login
        .getLogin(formdatas)
        .then(res => {
          console.log(res.status)
          if (res.status == 0) {
            commit('SET_TOKEN', res.data.token)
            resolve(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  loginOut({ commit }) {
    commit('DEL_TOKEN')
    router.push({
      path: '/login',
      query: {
        redirect: '/'
      }
    })
  },
  _getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          if (res.code === 0) {
            const { name, roles, introduce } = res.data
            commit('SET_ROLES', roles)
            commit('SET_NAME', name)
            commit('SET_INTRODUCE', introduce)
          } else {
            Message.error(res.msg)
          }
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
