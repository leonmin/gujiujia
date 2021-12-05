import { create } from 'gretchen'
import * as poetry from './poetry'
export const gretchen = create({
  baseURL: 'https://v1.gujiujia.com/api/'
})

const params = (json: any) => {
  console.log('jjjj', json)
  const q: string[] = []
  Object.keys(json).forEach((x) => {
    q.push(`${x}=${json[x]}`)
  });
  if (q && q.length > 0) {
    return "?" + q.join("&")
  }
  return ""
};

export const request = async (
  url: string,
  method = 'GET',
  json: any,
  config: any = {}
) => {
  const options = {
    method
  } as Record<string, unknown>
  if (config.headers) {
    options.headers = config.headers
  }
  if (method === 'GET') {
    url += params(json)
  } else if (method === 'POST') {
    if (config && config.body) {
      options.body = json
    } else {
      options.json = json
    }
  }
  const { error, status, data } = await gretchen(url, options).json()
  if (status === 200 && data && data.statusCode === '000000') {
    return data.data
  } else {
    return error
  }
}
export {
  poetry
}