/** @format */

import $axios from '../ajax'

export default {
  getMenuList() {
    return $axios.get('/user/userinfo')
  }
}
