// 本地存储模块

const USER_KEY = 'user'

export const setUser = (data) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export const getUser = () => {
  window.localStorage.getItem(USER_KEY)
}

export const remoUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
