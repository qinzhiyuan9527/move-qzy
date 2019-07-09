<template>
  <div class="div-father">
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
      <van-button type="info" @click="loginLand">登陆</van-button>
    </div>
    <div class="bottom">
      <a href="javascript:;">隐私条款</a>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
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
      // try {
      const data = await login(this.user)
      console.log(data)
      this.$toast('登陆成功')
      this.$router.push({ name: 'home' })
      // } catch (err) {
      //   console.log(err)
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.div-father {
  .login {
    padding: 20px 10px;

    .van-button {
      width: 100%;
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 22px;
    a {
      color: #3296fa;
    }
  }
}
</style>
