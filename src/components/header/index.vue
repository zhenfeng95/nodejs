<!-- @format -->

<template>
  <div class="header">
    <div class="header-left">
      当前用户：张三
    </div>
    <div class="header-right">
      <ul>
        <li>修改密码</li>
        <li
          @click="loginOutFn"
          v-dataReportClick="{
            eleId: '退出登录'
          }"
        >
          退出登录
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
  methods: {
    ...mapActions(['loginOut']),
    loginOutFn() {
      this.loginOut()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  line-height: 50px;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 999;
  background: #eeeeee;
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: space-between;
  .header-left {
    padding-left: 25px;
  }
  .header-right {
    padding-right: 25px;
    ul {
      display: flex;
      li {
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
