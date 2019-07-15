/*
* 频道列表
* */
// 获取频道
import request from '@/utils/request'

export const channelList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 频道新闻推荐_V1.1
export const NewsRecommendation = ({ channelId, timestamp, withTop }) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}

// 获取全部频道列表
export const UserChannelList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 批量修改用户频道列表（重置式）
export const ModifyUserChannel = channels => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}

// 批量删除用户频道列表
export const DeleteUserChannels = targetId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${targetId}`
  })
}
