import { VersionSectionsState } from './components/products/versions/version-sections'
import { appendUrlParams } from './utils'

export const ROUTE_INDEX = '/'
export const ROUTE_500 = '/500'
export const ROUTE_404 = '/404'
export const ROUTE_AUTH = '/auth'
export const ROUTE_PROFILE = '/auth/settings'
export const ROUTE_LOGOUT = '/auth/logout'

export const ROUTE_TEAMS = '/teams'
export const ROUTE_TEAMS_ACTIVE = '/teams/active'
export const ROUTE_TEAMS_AUDIT = '/teams/audit-log'
export const ROUTE_TEAMS_CREATE = '/teams/create'

export const ROUTE_PRODUCTS = '/products'

export const ROUTE_NODES = '/nodes'
export const ROUTE_REGISTRIES = '/registries'

export const API_STATUS = '/api/status'

export const API_PRODUCTS = '/api/products'
export const API_REGISTRIES = '/api/registries'
export const API_NODES = '/api/nodes'

export const API_TEAMS = '/api/teams'
export const API_TEAMS_ACTIVE = '/api/teams/active'
export const API_TEAMS_ACTIVE_USERS = `${API_TEAMS_ACTIVE}/users`
export const API_WHOAMI = '/api/whoami'

export const WS_NODES = `${API_NODES}/connect`
export const WS_REGISTRIES = `${API_REGISTRIES}/connect`

// product
export const productUrl = (id: string, params?: VersionUrlParams) => appendUrlParams(`${ROUTE_PRODUCTS}/${id}`, params)
export const productApiUrl = (id: string) => `/api${productUrl(id)}`
export const productVersionsApiUrl = (productId: string) => `${productApiUrl(productId)}/versions`

// registry
export const registryUrl = (id: string) => `${ROUTE_REGISTRIES}/${id}`
export const registryApiUrl = (id: string) => `/api${registryUrl(id)}`

// node
export const nodeUrl = (id: string) => `${ROUTE_NODES}/${id}`
export const nodeApiUrl = (id: string) => `/api${nodeUrl(id)}`
export const nodeWsUrl = (id: string) => `${nodeApiUrl(id)}/connect`
export const nodeSetupApiUrl = (id: string) => `${nodeApiUrl(id)}/setup`
export const nodeScriptApiUrl = (id: string) => `${nodeApiUrl(id)}/script`
export const nodeTokenApiUrl = (id: string) => `${nodeApiUrl(id)}/token`
export const nodeInspectUrl = (id: string, prefix?: string) => `${nodeUrl(id)}?prefix=${prefix}`

// version

export type versionUrlAnchor = 'edit'
export type VersionUrlParams = {
  anchor?: versionUrlAnchor
  section?: VersionSectionsState
}

export const versionUrl = (productId: string, versionId: string, params?: VersionUrlParams) =>
  appendUrlParams(`${productUrl(productId)}/versions/${versionId}`, params)

export const versionApiUrl = (productId: string, versionId: string) => `/api${versionUrl(productId, versionId)}`
export const versionIncreaseApiUrl = (productId: string, versionId: string) =>
  `${versionApiUrl(productId, versionId)}/increase`
export const versionWsUrl = (productId: string, versionId: string) => `${versionApiUrl(productId, versionId)}/connect`

// deployment
export const versionDeploymentsUrl = (productId: string, versionId: string) =>
  `${versionUrl(productId, versionId)}/deployments`
export const versionDeploymentsApiUrl = (productId: string, versionId: string) =>
  `/api${versionDeploymentsUrl(productId, versionId)}`

export const deploymentUrl = (productId: string, versionId: string, deploymentId: string) =>
  `${versionUrl(productId, versionId)}/deployments/${deploymentId}`

export const deploymentApiUrl = (productId: string, versionId: string, deploymentId: string) =>
  `/api${deploymentUrl(productId, versionId, deploymentId)}`

export const deploymentWsUrl = (productId: string, versionId: string, deploymentId: string) =>
  `${deploymentApiUrl(productId, versionId, deploymentId)}/connect`

export const deploymentDeployUrl = (productId: string, versionId: string, deploymentId: string) =>
  `${deploymentUrl(productId, versionId, deploymentId)}/deploy`

export const teamsInviteUrl = (teamId: string) => `${ROUTE_TEAMS}/${teamId}/invite`
export const teamsActiveUserApiUrl = (userId: string) => `${API_TEAMS_ACTIVE_USERS}/${userId}`
export const teamAcceptInviteApiUrl = teamId => `${API_TEAMS}/${teamId}/accept`