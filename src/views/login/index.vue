<template>
  <div>
    <van-cell-group>
      <van-field
        left-icon="contact"
        v-model="user.mobile"
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field
        left-icon="closed-eye"
        v-model="user.code"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <div class="login">
      <van-button type="info" @click="loginLand">主要按钮</van-button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '15128488941',
        code: '123456'
      }
    }
  },
  methods: {
    async loginLand () {
      try {
        await axios({
          method: 'POST',
          url: 'http://toutiao.course.itcast.cn/app/v1_0/authorizations',
          data: this.user
        })
        this.$toast('登陆成功')
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  padding: 20px 10px;

  .van-button {
    width: 100%;
  }
}
</style>
