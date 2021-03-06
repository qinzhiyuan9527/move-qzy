/**
 * 文章相关接口
 */

// 对文章不喜欢
import request from '@/utils/request'
export const DislikeArticles = (targetId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: targetId
    }
  })
}
