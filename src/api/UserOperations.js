/**
 * 用户操作相关
 */
import request from '@/utils/request'

// 拉黑用户
export const BlackoutUsers = (targetId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: targetId
    }
  })
}

// 举报文章
export const ReportingArticles = ({ label, value, remark }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      target: label,
      type: value,
      remark
    }
  })
}
