<!-- @format -->

<template>
  <div class="login">
    <div class="login-box">
      <h2 class="loginH2">备件管理系统</h2>
      <div class="loginCon">
        <div class="titleDiv">
          <h3>Sign up now</h3>
          <p>Enter your username and password to log on:</p>
          <i class="el-icon-key"></i>
        </div>
        <el-form ref="loginForm" :rules="rules" :model="ruleForm">
          <el-form-item prop="user">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              v-model="ruleForm.user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="loginBtn"
            v-dataReportClick="{
              eleId: '登录'
            }"
            @click="loginFn"
            >登录</el-button
          >
          <el-button
            type="primary"
            class="loginBtn"
            v-dataReportClick="{
              eleId: '扫码登录'
            }"
            @click="loginSm"
            >扫码登录</el-button
          >
          <Scan v-if="showSm" @scanResult="scanResult"></Scan>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/** @format */
import Scan from '@components/scan'
import { createNamespacedHelpers } from 'vuex'
const {
  mapMutations,
  mapState: mapStateWithUser,
  mapActions,
  mapGetters
} = createNamespacedHelpers('user')

const { mapState: mapStateWithGlobal } = createNamespacedHelpers('global')
export default {
  data() {
    return {
      ruleForm: {
        user: '',
        password: ''
      },
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      showSm: false
    }
  },
  computed: {
    ...mapStateWithUser(['token']),
    ...mapStateWithGlobal(['isMobile', 'isIos'])
  },
  mounted() {
    console.log(this.token)
  },
  methods: {
    ...mapActions(['login']),
    loginFn() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          console.log(this.$route.query.redirect)
          console.log(this.ruleForm)
          this.login({
            user: '123'
          }).then(res => {
            this.$router.push({
              path: '/'
            })
          })
        } else {
          return
        }
      })
    },
    loginSm() {
      this.showSm = true
    },
    scanResult(result) {
      if (result) {
        this.$router.push({
          path: '/',
          query: {}
        })
      }
    }
  },
  components: {
    Scan
  }
}
</script>
<style scoped lang="scss">
/** @format */
.login-box {
  height: 455px;
  width: 550px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #eeeeee;
}
</style>
