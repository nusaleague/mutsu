export const ENV_DEV = process.env.NODE_ENV === 'development'

export const ENV_PRODUCTION = process.env.NODE_ENV === 'development'

export const ENV_SERVER = typeof window === 'undefined'

export const ENV_CLIENT = !ENV_SERVER
