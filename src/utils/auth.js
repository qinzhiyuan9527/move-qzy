// 本地存储模块

const USER_KEY = 'user'

// 添加本地存储
export const saveUser = (data) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}

// 读取本地存储
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

// 移除本地存储
export const remoUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
