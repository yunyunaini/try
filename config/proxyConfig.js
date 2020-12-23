/* eslint-disable no-undef */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 */
module.exports = {
    dev: {
			'/api/' : {
				target: 'http://cxxwechat.jd.com/',
				changeOrigin: true,
				pathRewrite: {'^/api': ''}
			}
		},
		test: {
			'/api/' : {
				target: 'http://cxxwechat.jd.com/',
				changeOrigin: true,
				pathRewrite: {'^/api': ''}
			}
    }
}
