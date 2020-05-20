/** @format */
import utils from '@helper/utils'

const state = {
  isMobile: utils.getDeviceInfo().mobile,
  isIos: utils.getDeviceInfo().mobile && utils.getDeviceInfo().ios
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
