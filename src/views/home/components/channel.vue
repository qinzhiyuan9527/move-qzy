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
            @click="isState = !isState"
          >
            {{isState ? '完成' : '编辑' }}
          </van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="(item, index) in channel"
          :key="item.id"
          @click="modifyChannelClick(item, index)"
        >
          <span class="text" :class="{active : index === channel_id && !isState}">{{item.name}}</span>
          <van-icon v-show="isState && !UndeletedChannels.includes(item.name)" class="close-icon" name="close" />
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
          v-for="(item, index) in rescommendChannels"
          :key="item.id"
          @click="addTochannel(item, index)"
        >
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { UserChannelList, ModifyUserChannel, DeleteUserChannels } from '@/api/channelList'
import { mapState } from 'vuex'
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
    return {
      channelData: [], // 所有频道列表
      isState: false, // 用户频道状态显示
      UndeletedChannels: ['推荐']
    }
  },
  computed: {
    rescommendChannels () {
      let channelId = this.channel.map(item => item.id)
      // 过滤全部频道列表排除用户频道列表
      return this.channelData.filter(item => !channelId.includes(item.id))
    },
    // 加载 用户登录信息 相当于 this.$store.state.user
    ...mapState(['user'])
  },
  created () {
    this.channelLoadList()
  },
  methods: {
    // 加载全部频道
    async channelLoadList () {
      const data = await UserChannelList()
      data.channels.forEach(item => {
        // 储存当前频道文章列表
        item.articles = []
        // 上拉刷新状态控制
        item.PullUpLoading = false
        // 下拉刷新状态控制
        item.DropDownLoading = false
        // 全部加载完成状态
        item.CompletedFinished = false
        // 时间戳
        item.timestamp = Date.now()
        // 下拉状态显示
        item.DropSuccessText = null
      })
      this.channelData = data.channels
    },
    async addTochannel (item, index) {
      this.channel.push(item)
      this.$toast({
        message: '添加成功',
        duration: 800
      })
      // 已登录
      if (this.user) {
        try {
          const channels = this.channel.map((item, index) => {
            return { id: item.id, seq: index }
          }).filter(item => item.id !== 0)

          await ModifyUserChannel(channels)
          this.$toast({
            message: '添加成功',
            duration: 500
          })
        } catch (e) {
          this.$toast('添加失败')
          console.log(e)
        }

        return
      }

      // 未登录
      window.localStorage.setItem('channels', JSON.stringify(this.channel))
    },
    // 删除频道
    async DeleteChannels (item, index) {
      this.channel.splice(index, 1)
      if (this.user) {
        // 登陆删除需要发请求
        try {
          await DeleteUserChannels(item.id)
          this.channelLoadList()
          this.$toast({
            message: '删除成功',
            duration: 500
          })
        } catch (e) {
          this.$toast('删除失败')
          console.log(e)
        }
        return
      }
      // 未登录删除
      window.localStorage.setItem('channels', JSON.stringify(this.channel))
    },
    // 跳转高亮显示
    jumpHighlight (item, index) {
      this.$emit('update:channel_id', index)
      this.$emit('input', false)
    },
    // 修改用户频道
    modifyChannelClick (item, index) {
      if (this.isState) {
        // 删除频道
        !this.UndeletedChannels.includes(item.name) && this.DeleteChannels(item, index)
      } else {
        // 跳转高亮显示
        this.jumpHighlight(item, index)
      }
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
        font-size: 24px;
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
