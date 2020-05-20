/** @format */

import $axios from '../ajax'

export default {
  getLogin(data) {
    return $axios.post('/login', data)
  }
}
