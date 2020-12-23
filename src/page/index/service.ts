/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import request from '../../commom/request'

export async function fetchdata(params?: { act_token: string }) {
  return request('/jdlogin/login', {
    params
  })
}