import Router from 'next/router'
import shuffle from 'lodash/shuffle'
import {ENV_SERVER} from './env'

export function toProperCase(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
}

export function shuffleDeep(obj) {
  if (Array.isArray(obj)) {
    return shuffle(obj)
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      obj[key] = shuffleDeep(value)
    }
  }

  return obj
}

export async function checkAuth({res, store, asPath}) {
  if (ENV_SERVER) {
    res.writeHead(302, {Location: getLoginRedirectUrl(asPath, 'require-auth')})
    res.end()
    return true
  }

  const {auth} = store.getState()
  if (!auth) {
    await Router.push(getLoginRedirectUrl(asPath, 'require-auth'))
    return true
  }
}

function getLoginRedirectUrl(path, info) {
  const params = new URLSearchParams()
  params.append('next', path)
  if (info) {
    params.append('info', info)
  }

  return `/login?${params}`
}
