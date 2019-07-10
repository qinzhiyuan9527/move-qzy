<template>
  <div class="div-father">
    <van-nav-bar
      title="登陆"
      left-arrow
    />
    <van-cell-group>
      <van-field
        left-icon="contact"
        v-model="user.mobile"
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
        v-validate="'required'"
        type="text"
        name="用户名"
        :error-message ="errors.first('用户名')"
      />

      <van-field
        left-icon="closed-eye"
        v-model="user.code"
        type="password"
        label="密码"
        placeholder="请输入密码"
        v-validate="'required'"
        name="密码"
        :error-message ="errors.first('密码')"
      />
    </van-cell-group>
    <div class="login">
      <van-button type="info" :loading="loading" loading-text="加载中..." @click="loginLand">登陆</van-button>
    </div>
    <div class="bottom">
      <a href="javascript:;">隐私条款</a>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setUser } from '../../utils/auth'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '15128488941',
        code: '123456'
      },
      loading: false
    }
  },
  methods: {
    // 登陆功能
    async loginLand () {
      this.loading = true
      const res = await this.$validator.validate()
      if (!res) {
        this.loading = false
        this.$toast('请正确填写格式哦！')
        return
      }
      try {
        const data = await login(this.user)
        setUser(data)
        this.loading = false
        this.$toast('登陆成功')
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.$toast('登陆失败！')
        this.loading = false
        console.log(err)
      }
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
