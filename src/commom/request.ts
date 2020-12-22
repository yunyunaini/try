import { extend } from 'umi-request'
import Toster from '../../src/components/toster'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const codeMessage: any = {
    200: '服务器成功返回请求的数据。',
    406: '请求的格式不可得。',
    500: '请求数据超时',
    502: '网关错误。',
    503: '服务不可用，服务器暂时维护。',
    504: '网关超时。'
}

/**
 * 
 * @param error 异常处理
 */
const errorHandler = (error:{response: Response}) =>{
	const {response } = error
	if(response && response.status){
		Toster.error({
			content: `请求错误 ${codeMessage[status]}`
		})
	}else if(!response){
		Toster.error({
			content: '网络异常无法连接'
		})
	}
	return response
}

/**
 * 配置请求时的默认参数
 */
const request = extend({
	prefix: '/api', //请求接口前缀
	errorHandler, //默认错误处理
	credentials: 'include', //默认请求是否带上cook
	requestType: 'form',  //post请求数据类型
  timeout: 30000
})

request.interceptors.request.use((url, options) => {
  const Hot =   `https://cxxwechat.jd.com${url}`
  return {
    url: Hot,
    options: { ...options }
  }
})
export default request




  