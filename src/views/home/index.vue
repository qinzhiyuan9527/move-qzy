<template>
  <div>
    <van-nav-bar
      title="首页"
      left-arrow
      fixed
    />

    <van-tabs class="channel-tabs"  v-model="channel_id">
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <van-pull-refresh
          v-model="item.DropDownLoading"
          @refresh="onRefresh"
          :success-text="item.DropSuccessText"
          :success-duration="1000"
        >
          <van-list
            v-model="item.PullUpLoading"
            :finished="item.CompletedFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="articlesItem in item.articles"
              :key="articlesItem.aut_id"
              :title="articlesItem.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { channelList, NewsRecommendation } from '@/api/channelList'
export default {
  name: 'Home',
  data () {
    return {
      // 频道id
      channel_id: 0,
      channels: [] // 频道列表
    }
  },
  computed: {
    /**
     * 当前激活的频道
     */
    activeChannel () {
      return this.channels[this.channel_id]
    }
  },
  watch: {
    // 监听vuex 里数据的变化
    '$store.state.user' () {
      this.loadChannels()
      this.activeChannel.PullUpLoading = true
    }
  },
  created () {
    // 加载频道
    this.loadChannels()
  },
  methods: {
    // 加载频带列表
    async loadChannels () {
      const { user } = this.$store.state
      let channels = []
      // 已登录
      if (user) {
        const data = await channelList()
        channels = data.channels
      } else {
        /// 未登录
        const localChannels = JSON.parse(window.localStorage.getItem('channels'))
        if (localChannels) {
          channels = localChannels
        } else {
          const data = await channelList()
          channels = data.channels
        }
      }
      channels.forEach(item => {
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
      this.channels = channels
    },
    // 上拉刷新
    async onLoad () {
      let data = []
      await this.$sleep(600)
      data = await this.HomeNewsRecommendation()

      if (!data.pre_timestamp && !data.results.length) {
        this.activeChannel.CompletedFinished = true
        // 数据加载完毕取消上拉加载 loading
        this.activeChannel.PullUpLoading = false
        return
      }

      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp
        data = await this.HomeNewsRecommendation()
      }
      this.activeChannel.timestamp = data.pre_timestamp
      // this.activeChannel.articles = data.results
      // 在当前频道添加数据
      this.activeChannel.articles.push(...data.results)
      // 数据加载完毕取消上拉加载 loading
      this.activeChannel.PullUpLoading = false
    },
    // 下拉刷新
    async onRefresh () {
      // const onTimestamp = this.activeChannel.timestamp
      this.activeChannel.timestamp = Date.now()
      const data = await this.HomeNewsRecommendation()
      if (data.results.length) {
        this.activeChannel.articles = data.results
        this.activeChannel.timestamp = data.pre_timestamp
        this.activeChannel.DropSuccessText = '更新成功'
        /// 更新之后重新加载
        this.onLoad()
      } else {
        this.activeChannel.DropSuccessText = '已是最新数据'
      }
      this.activeChannel.DropDownLoading = false
    },
    // 加载推荐文章列表
    async HomeNewsRecommendation () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await NewsRecommendation({
        channelId,
        timestamp,
        withTop: 1
      })
      return data
    }
  }
}

</script>

<style lang="less" scoped>
  .channel-tabs /deep/ .van-tabs__wrap {
    position: fixed;
    top: 88px;
  }
  .channel-tabs /deep/ .van-tabs__content {
    margin-top: 100px;
  }
  .van-tabs {
    margin-bottom: 100px;
  }
</style>
