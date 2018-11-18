import axios from 'axios'

// 服务端请求地址 127.0.0.1:3000 ,  客户端请求地址: xxx
const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`
    return result
  }, '')
  return `${baseUrl}/api/${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then((resp) => {
        resolve(resp.data)
      }).catch(reject)
  })
}

export const post = (url, params, data) => {
  return new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params), data)
      .then((resp) => {
        resolve(resp.data)
      }).catch(reject)
  })
}
