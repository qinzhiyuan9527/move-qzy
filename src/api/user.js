/*
* 登陆模块
* */

import request from '@/utils/request'

// 登陆功能
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
