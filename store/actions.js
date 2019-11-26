export const AUTH_LOGIN = 'AUTH_LOGIN'

export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export function authLogin(user) {
  return {
    type: AUTH_LOGIN,
    data: { user }
  }
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT
  }
}
