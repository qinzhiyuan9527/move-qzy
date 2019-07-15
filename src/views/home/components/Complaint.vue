<template>
  <div>
    <van-dialog
      :value="value"
      :showConfirmButton="false"
      close-on-click-overlay
      @input="$emit('input', $event)"
    >
      <van-cell-group v-if="!isOk">
        <van-cell icon="more-o" title="不感兴趣" clickable @click="HomeMoreActionShow" />
        <van-cell icon="more-o" title="反馈垃圾内容" is-link @click="isOk = true" />
        <van-cell icon="more-o" title="拉黑作者" clickable @click="ComplaintsagainstBlackoutUsers" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell is-link arrow-direction="left" clickable @click="isOk = !isOk" />
        <van-cell icon="more-o" title="拉黑作者" clickable />
        <van-cell icon="more-o" title="拉黑作者" clickable />
        <van-cell icon="more-o" title="拉黑作者" clickable />
        <van-cell icon="more-o" title="拉黑作者" clickable />
        <van-cell icon="more-o" title="拉黑作者" clickable />
        <van-cell icon="more-o" title="拉黑作者" clickable />
        <van-cell icon="more-o" title="拉黑作者" clickable />
        <van-cell icon="more-o" title="拉黑作者" clickable />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { DislikeArticles } from '@/api/article'
import { BlackoutUsers } from '@/api/UserOperations'
export default {
  name: 'HomeComplaint',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    JumpComplaintData: {
      type: Object,
      request: true
    }
  },
  data () {
    return {
      isOk: false
    }
  },
  methods: {
    ComplaintOptions () {
      this.isOk = true
    },
    // 不喜欢
    async HomeMoreActionShow () {
      try {
        await DislikeArticles(this.JumpComplaintData.art_id)
        this.$emit('dislike')
        this.$emit('input', false)
        this.$toast('操作成功')
      } catch (e) {
        this.$toast('操作失败')
        console.log(e)
      }
    },
    // 拉黑用户
    async ComplaintsagainstBlackoutUsers () {
      try {
        await BlackoutUsers(this.JumpComplaintData.aut_id)
        this.$emit('BlackoutUsers')
        this.$emit('input', false)
        this.$toast('操作成功')
      } catch (e) {
        this.$toast('操作失败')
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
