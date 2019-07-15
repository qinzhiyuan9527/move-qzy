<template>
  <div>
    <van-dialog
      :value="value"
      :showConfirmButton="false"
      close-on-click-overlay
      @input="$emit('input', $event)"
    >
      <van-cell-group v-if="!isOk">
        <van-cell icon="more-o" title="不感兴趣" clickable />
        <van-cell icon="more-o" title="反馈垃圾内容" is-link @click="ComplaintOptions" />
        <van-cell icon="more-o" title="拉黑作者" clickable />
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
export default {
  name: 'HomeComplaint',
  props: {
    value: {

    }
  },
  data () {
    return {
      isOk: false
    }
  },
  methods: {
    ComplaintOptions () {
      console.log('hhh')
      this.isOk = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
