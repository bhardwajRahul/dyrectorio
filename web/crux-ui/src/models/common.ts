export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

// errors

export type DyoErrorDto = {
  error: string
  property?: string
  value?: any
  description: string
}

export type DyoApiError = DyoErrorDto & {
  status: number
}

// deployment

export const DEPLOYMENT_STATUS_VALUES = ['preparing', 'in-progress', 'successful', 'failed', 'obsolete'] as const
export type DeploymentStatus = typeof DEPLOYMENT_STATUS_VALUES[number]

// ws

export const WS_TYPE_DYO_ERROR = 'dyo-error'
export type DyoErrorMessage = DyoApiError

export const WS_TYPE_PATCH_RECEIVED = 'patch-received'
