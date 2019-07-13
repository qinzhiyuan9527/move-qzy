<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input', $event)"
      round
      position="bottom"
      :style="{ height: '95%' }"
    >
      <div>
        <div>
          <span>我的频道</span>
          <button>编辑</button>
        </div>
        <div>
          <van-grid
            :gutter="10"
            clickable
          >
            <van-grid-item
              v-for="(item, index) in channel"
              :key="item.id"
            >
              <span
                :class="{activeIndex : index === channel_id}"
                slot="text"
              >
                {{ item.name }}
              </span>
            </van-grid-item>
          </van-grid>
        </div>
      </div>

    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'homeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    channel: {
      type: Array,
      default: () => []
    },
    channel_id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  created () {
    this.channelLoadList()
  },
  methods: {
    channelLoadList () {
      console.log(this.$store.state.user)
    }
  }
}
</script>

<style lang="less" scoped>
  .van-grid-item {
    font-size: 26px;
  }
  .activeIndex {
    color: #f40;
  }
</style>
