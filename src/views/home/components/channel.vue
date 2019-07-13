<template>
  <van-popup
    :style="{ height: '95%' }"
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    get-container="body"
    :lazy-render="false"
  >
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
          >编辑</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="(item, index) in channel"
          :key="item.id"
          text="文字">
          <span class="text" :class="{active : index === channel_id}">{{item.name}}</span>
          <van-icon class="close-icon" name="close" />
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="value in 8"
          :key="value"
          text="文字">
          <div class="info">
            <span class="text">文字</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { UserChannelList } from '@/api/channelList'
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
    async channelLoadList () {
      let data = await UserChannelList()
      // const dataText = this.channel.map(item => item.name)
      // let text = data.channels.filter((item, index) => {
      //   console.log(dataText[index])
      //   return item.name !== dataText[index]
      // })
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .channel {
    .channel-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      .title {
        font-size: 30px;
        margin-right: 5px;
      }
      .desc {
        font-size: 12px;
      }
      .action {}
    }
    .channel-content {
      .text {
        font-size: 26px;
      }
      .active {
        color: red;
      }
      .close-icon {
        font-size: 24px;
        position: absolute;
        top: -5px;
        right: -5px;
        z-index: 999;
        background-color: #fff;
      }
      .info {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
