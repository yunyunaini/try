/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/**
 * @param execute 需要包装的函数
 * @param delay 延迟时间，单位ms
 * @param immediate 是否默认执行一次(第一次不延迟)
 * @returns {function} debounced 返回一个函数
 */
export default function debounce(execute: Function, delay: number, immediate: boolean): Function {
  let timer: NodeJS.Timeout | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let args: any
  let timestamp: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: (...args: any[]) => any | PromiseLike<any>
  const later = () => {
    const last = +new Date() - timestamp
    if (last < delay && last >= 0) {
      timer = setTimeout(later, delay - last)
    } else {
      timer = null
      if (!immediate) {
        result = execute.apply(args)
      }
    }
  }
  const debounced = (...arg: any[]) => {
    args = arg
    timestamp = +new Date()
    const callNow = immediate && !timer
    if (!timer) {
      timer = setTimeout(later, delay)
    }
    if (callNow) {
      result = execute.apply(arg)
    }
    return result
  }
  return debounced
}
