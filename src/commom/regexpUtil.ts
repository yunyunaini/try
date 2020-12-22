/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * 获取url的参数
 */
export const getUrlParams = (name: string, url?: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const hash = window.location.hash!
  const r_txt = url ? url : hash
  const r = r_txt.substring(hash.search(/\?/) + 1).match(reg)
  return r ? decodeURIComponent(r[2]) : ''
}

/**
 * 匹配http|https开头的网络地址
 */
export const patternUrl = (url: string) => {
  const reg = /(http|https):\/\/([\w.]+\/?)\S*/
  const r = reg.test(url)
  return r ? url : 'http://' + url
}
