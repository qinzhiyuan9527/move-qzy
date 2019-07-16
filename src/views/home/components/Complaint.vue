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
        <van-cell is-link arrow-direction="left" clickable @click="isOk = false" />
        <van-cell
          v-for="item in reportTypes"
          icon="more-o" :title="item.label"
          :key="item.value"
          @click="homeReportingArticles(item)"
          clickable
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { DislikeArticles } from '@/api/article'
import { BlackoutUsers, ReportingArticles } from '@/api/UserOperations'
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
      isOk: false,
      reportTypes: [
        { label: '标题夸张', value: 1 },
        { label: '低俗色情', value: 2 },
        { label: '错别字多', value: 3 },
        { label: '旧闻重复', value: 4 },
        { label: '广告软文', value: 5 },
        { label: '内容不实', value: 6 },
        { label: '涉嫌违法犯罪', value: 7 },
        { label: '侵权', value: 8 },
        { label: '其他问题', value: 0 }
      ]
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
    },
    // 举报文章
    async homeReportingArticles (value) {
      try {
        const label = this.JumpComplaintData.art_id
        await ReportingArticles({ value: value.value, label })
        this.$toast({
          message: '操作成功',
          duration: 800
        })
      } catch (e) {
        if (e.response.status === 409) {
          this.$toast({
            message: '已经举报改文章了',
            duration: 800
          })
        }
        console.dir(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
