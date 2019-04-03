import ky from 'ky-universal'
import uuid from 'uuid/v4'

export const {ENDPOINT} = process.env

export const client = ky.extend({
  prefixUrl: process.env.ENDPOINT,
  credentials: 'include'
})

export async function rpc(method, params, opts = {}) {
  const {
    id = uuid()
  } = opts

  const httpResponse = await client.post('rpc', {
    json: {
      jsonrpc: '2.0',
      method,
      params,
      ...(id ? {id} : {})
    }
  })

  if (httpResponse.status === 204) {
    return
  }

  const {error, result} = await httpResponse.json()

  if (error) {
    const {code, message, data} = error
    throw new AppError(code, message, data)
  }

  return result
}

export class AppError extends Error {
  constructor(code, message, data) {
    super(message)

    this.code = code

    if (typeof data !== 'undefined') {
      this.data = data
    }
  }
}
