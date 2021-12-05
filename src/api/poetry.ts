import { request } from './index'
function getRandom (data: any) {
  return request('/poetries/random', 'GET', data)
}
export {
  getRandom
}