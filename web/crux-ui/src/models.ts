import { Identity } from '@ory/kratos-client'
import { DyoApiError } from '@server/error-middleware'
import { REGISTRY_GITHUB_URL, REGISTRY_GITLAB_URLS, REGISTRY_HUB_URL } from './const'

export const PRODUCT_TYPE_VALUES = ['simple', 'complex'] as const
export type ProductType = typeof PRODUCT_TYPE_VALUES[number]

export const VERSION_TYPE_VALUES = ['incremental', 'rolling'] as const
export type VersionType = typeof VERSION_TYPE_VALUES[number]

export type UniqueKeyValue = {
  id: string
  key: string
  value: string
}

export type Environment = UniqueKeyValue[]
export type Capabilities = UniqueKeyValue[]

export type ExplicitContainerConfigPort = {
  internal: number
  external: number
}

export const EXPLICIT_CONTAINER_NETWORK_MODE_VALUES = ['none', 'host'] as const
export type ExplicitContainerNetworkMode = typeof EXPLICIT_CONTAINER_NETWORK_MODE_VALUES[number]

export type ExplicitContainerConfigExpose = {
  public: boolean
  tls: boolean
}

export type ExplicitContainerConfig = {
  ports: ExplicitContainerConfigPort[]
  mounts: string[]
  networkMode?: ExplicitContainerNetworkMode
  expose?: ExplicitContainerConfigExpose
  user?: number
}

export type CompleteContainerConfig = ExplicitContainerConfig & {
  environment?: Record<string, string>
  capabilities?: Record<string, string>
}

export type ContainerConfig = {
  capabilities?: Capabilities
  environment?: Environment
  config?: ExplicitContainerConfig
}

export type AddContainerImageToVersion = {
  name: string
  tag: string
  registryId: string
  order: number
}

export type ContainerImage = AddContainerImageToVersion & {
  id: string
  config?: ContainerConfig
}

export type PatchContainerImage = {
  name?: string
  tag?: string
  config?: ContainerConfig
}

export type ContainerStatus = 'created' | 'restarting' | 'running' | 'removing' | 'paused' | 'exited' | 'dead'

export type Container = {
  id: string
  name: string
  date: string
  status: ContainerStatus
}

export type Instance = {
  id: string
  image: ContainerImage
  status?: ContainerStatus
  config?: ContainerConfig
}

export type DeploymentStatus = 'preparing' | 'inProgress' | 'successful' | 'failed' | 'obsolate'

export type Deployment = {
  id: string
  name: string
  nodeId: string
  nodeName: string
  date: string
  prefix: string
  status: DeploymentStatus
}

export type DeploymentDetails = {
  id: string
  versionId: string
  nodeId: string
  name: string
  description?: string | undefined
  prefix: string
  updatedAt: string
  environment: Environment
  status: DeploymentStatus
  instances: Instance[]
}

export type DeploymentRoot = DeploymentDetails & {
  product: ProductDetails
  version: VersionDetails
  node: DyoNode
}

export type DeploymentEventType = 'log' | 'deploymentStatus' | 'containerStatus'

export type InstanceStatus = {
  instanceId: string
  status: ContainerStatus
}

export type DeploymentEvent = {
  type: DeploymentEventType
  value: string[] | DeploymentStatus | InstanceStatus
  createdAt: string
}

export type CreateDeployment = {
  nodeId: string
}

export type DeploymentCreated = {
  id: string
}

export type PatchInstance = {
  instanceId: string
  config: ContainerConfig
}

export type PatchDeployment = {
  id: string
  environment?: Environment
  instance?: PatchInstance
}

export type UpdateDeployment = {
  name: string
  description?: string
  prefix: string
}

export type Version = {
  id: string
  name: string
  changelog?: string
  type: VersionType
  default: boolean
  increasable: boolean
  updatedAt: string
}

export type IncreaseVersion = {
  name: string
  changelog?: string
}

export type UpdateVersion = IncreaseVersion & {
  default: boolean
}

export type CreateVersion = UpdateVersion & {
  type: VersionType
}

export type VersionDetails = Version & {
  mutable: boolean
  images: ContainerImage[]
  deployments: Deployment[]
}

export type Product = {
  id: string
  name: string
  description?: string
  type: ProductType
  updatedAt: string
}

export type EditableProduct = Product & {
  changelog?: string
}

export type ProductDetails = Product & {
  createdAt: string
  versions: Version[]
}

export type UpdateProduct = {
  name: string
  description?: string
  changelog?: string
}

export type CreateProduct = UpdateProduct & {
  type: ProductType
}

export type NodeStatus = 'connecting' | 'unreachable' | 'running'

export type DyoNode = {
  id: string
  icon?: string
  name: string
  description?: string
  address?: string
  status: NodeStatus
  connectedAt?: string
}

export type DyoNodeInstall = {
  command: string
  expireAt: string
  script: string
}

export type DyoNodeDetails = DyoNode & {
  hasToken: boolean
  install?: DyoNodeInstall
}

export type CreateDyoNode = {
  icon?: string
  name: string
  description?: string
}

export type UpdateDyoNode = CreateDyoNode & {
  address: string
}

export type DyoNodeScript = {
  content: string
}

export type Registry = {
  id: string
  icon?: string
  name: string
  description?: string
  url: string
}

export const REGISTRY_TYPE_VALUES = ['v2', 'hub', 'gitlab', 'github'] as const
export type RegistryType = typeof REGISTRY_TYPE_VALUES[number]

export type HubRegistryDetails = {
  type: 'hub'
  urlPrefix: string
}

export type V2RegistryDetails = {
  type: 'v2'
  url: string
  _private: boolean
  user?: string
  token?: string
}

export type GitlabRegistryDetails = {
  type: 'gitlab'
  urlPrefix: string
  user: string
  token: string
  selfManaged: boolean
  url?: string
  apiUrl?: string
}

export type GithubRegistryDetails = {
  type: 'github'
  urlPrefix: string
  user: string
  token: string
}

export type RegistryDetails = Omit<Registry, 'url'> &
  (HubRegistryDetails | V2RegistryDetails | GitlabRegistryDetails | GithubRegistryDetails) & {
    updatedAt: string
  }

export type UpdateRegistry = RegistryDetails
export type CreateRegistry = UpdateRegistry

export type AuditLog = {
  identityName: string
  date: string
  event: string
  info?: any
}

export type ServiceStatus = 'unavailable' | 'disrupted' | 'operational'

export type DyoServiceStatus = {
  crux: ServiceStatus
  kratos: ServiceStatus
}

export type DyoErrorDto = {
  error: string
  property?: string
  value?: any
  description: string
}

export type UnavailableErrorType = 'crux' | 'kratos'

export type UnavailableErrorDto = DyoErrorDto & {
  error: UnavailableErrorType
}

export type DyoFetchError = DyoErrorDto & {
  status: number
}

// ws - common

export const WS_TYPE_DYO_ERROR = 'dyo-error'
export type DyoErrorMessage = DyoApiError

// ws - nodes

export const WS_TYPE_GET_NODE_STATUS_LIST = 'get-node-status-list'
export type GetNodeStatusListMessage = {
  nodeIds: string[]
}

export const WS_TYPE_NODE_STATUS = 'node-status'
export type NodeStatusMessage = {
  nodeId: string
  status: NodeStatus
  address?: string
}

export const WS_TYPE_NODE_STATUSES = 'node-status-list'

export const WS_TYPE_WATCH_CONTAINER_STATUS = 'watch-container-status'
export const WS_TYPE_STOP_WATCHING_CONTAINER_STATUS = 'stop-watching-container-status'
export type WatchContainerStatusMessage = {
  prefix?: string
}

export const WS_TYPE_CONTAINER_STATUS_LIST = 'container-status-list'
export type ContainerListMessage = Container[]

// ws - registries

export type FindImageResult = {
  name: string
}

export const WS_TYPE_FIND_IMAGE = 'find-image'
export type FindImageMessage = {
  registryId: string
  filter: string
}

export const WS_TYPE_FIND_IMAGE_RESULT = 'find-image-result'
export type FindImageResultMessage = {
  registryId: string
  images: FindImageResult[]
}

export const WS_TYPE_REGISTRY_FETCH_IMAGE_TAGS = 'fetch-image-tags'
export type FetchImageTagsMessage = RegistryImages

export type RegistryImageTags = {
  name: string
  tags: string[]
}

export const WS_TYPE_REGISTRY_IMAGE_TAGS = 'registry-image-tags'
export type RegistryImageTagsMessage = {
  registryId: string
  images: RegistryImageTags[]
}

// ws - images

export type RegistryImages = {
  registryId: string
  images: string[]
}

export const WS_TYPE_ADD_IMAGES = 'add-images'
export type AddImagesMessage = {
  registryImages: RegistryImages[]
}

export const WS_TYPE_DELETE_IMAGE = 'delete-image'
export type DeleteImageMessage = {
  imageId: string
}

export const WS_TYPE_IMAGE_DELETED = 'image-deleted'
export type ImageDeletedMessage = {
  imageId: string
}

export const WS_TYPE_IMAGES_ADDED = 'images-added'
export type ImagesAddedMessage = {
  images: ContainerImage[]
}

export const WS_TYPE_PATCH_IMAGE = 'patch-image'
export type PatchImageMessage = PatchContainerImage & {
  id: string
}

export const WS_TYPE_ORDER_IMAGES = 'order-images'
export type OrderImagesMessage = string[]

export const WS_TYPE_IMAGES_WERE_REORDERED = 'images-were-reordered'
export type ImagesWereReorderedMessage = string[]

export const WS_TYPE_IMAGE_UPDATED = 'image-updated'
export type ImageUpdateMessage = PatchImageMessage

export const WS_TYPE_GET_IMAGE = 'get-image'
export type GetImageMessage = {
  id: string
}

export const WS_TYPE_IMAGE = 'image'
export type ImageMessage = ContainerImage

// ws - deployment

export const WS_TYPE_PATCH_DEPLOYMENT_ENV = 'patch-deployment-env'
export type PatchDeploymentEnvMessage = Environment

export const WS_TYPE_DEPLOYMENT_ENV_UPDATED = 'deployment-env-updated'
export type DeploymentEnvUpdatedMessage = Environment

export const WS_TYPE_PATCH_INSTANCE = 'patch-instance'
export type PatchInstanceMessage = ContainerConfig & {
  instanceId: string
}

export const WS_TYPE_INSTANCE_UPDATED = 'instance-updated'
export type InstanceUpdatedMessage = ContainerConfig & {
  instanceId: string
}

export const WS_TYPE_GET_INSTANCE = 'get-instance'
export type GetInstanceMessage = {
  id: string
}

export const WS_TYPE_INSTANCE = 'instance'
export type InstanceMessage = Instance

export const WS_TYPE_INSTANCES_ADDED = 'instances-added'
export type InstancesAddedMessage = Instance[]

export type DeploymentEditEventMessage = InstancesAddedMessage | ImageDeletedMessage

export const WS_TYPE_FETCH_DEPLOYMENT_EVENTS = 'fetch-deployment-events'
export type FetchDeploymentEventsMessage = {
  id: string
}

export const WS_TYPE_DEPLOYMENT_EVENT = 'deployment-event'
export const WS_TYPE_DEPLOYMENT_EVENT_LIST = 'deployment-event-list'
export type DeploymentEventMessage = DeploymentEvent

export const WS_TYPE_START_DEPLOYMENT = 'start-deployment'
export type StartDeploymentMessage = {
  id: string
}

export const WS_TYPE_DEPLOYMENT_FINISHED = 'deployment-finished'

// user

export type Team = UserMetaTeam & {
  users: User[]
}

export type UserRole = 'owner' | 'user'

export type UserStatus = 'pending' | 'verified'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

export type InviteUser = {
  email: string
}

export type IdentityTraits = {
  email: string
  name?: IdentityTraitsName
}

export type IdentityTraitsName = {
  first?: string
  last?: string
}

export type UserMeta = {
  user: User
  activeTeamId?: string
  teams: UserMetaTeam[]
  invitations: UserMetaTeam[]
}

export type UserMetaTeam = {
  id: string
  name: string
}

export type SelectTeam = {
  id: string
}

export type CreateTeam = {
  name: string
}

export const roleToText = (role: UserRole) => {
  switch (role) {
    case 'owner':
      return 'common:roleOwner'
    case 'user':
      return 'common:roleUser'
  }
}

export const selectedTeamOf = (meta: UserMeta): UserMetaTeam => {
  const team = meta.teams.find(it => it.id === meta.activeTeamId)
  return team
}

export const userCanEditTeam = (identity: Identity, team: Team): boolean => {
  const user = team.users.find(it => it.id === identity.id)
  if (!user) {
    return false
  }

  return user.role === 'owner'
}

export const nameOfIdentity = (identity: Identity): string => {
  const traits = identity.traits as IdentityTraits
  return `${traits?.name?.first ?? ''} ${traits?.name?.last ?? ''}`
}

export const productDetailsToEditableProduct = (product: ProductDetails) => {
  return {
    ...product,
    changelog: product.type === 'simple' ? product.versions[0].changelog : null,
  } as EditableProduct
}

export const updateProductDetailsWithEditableProduct = (product: ProductDetails, edit: EditableProduct) => {
  const newProduct = {
    ...product,
    ...edit,
  }

  if (product.type === 'simple') {
    const version = product.versions[0]

    newProduct.versions = [
      {
        ...version,
        changelog: edit.changelog,
      },
    ]
  }

  return newProduct
}

export const deploymentIsMutable = (status: DeploymentStatus) => status === 'preparing' || status === 'failed'

const AUDIT_LOG_EVENT_PREFIX = '/crux.Crux'
export const beautifyAuditLogEvent = (event: string): string => {
  let parts = event.split(AUDIT_LOG_EVENT_PREFIX)
  if (parts.length < 2) {
    return event
  }

  parts = parts[1].split('/')
  return parts.length < 2 ? parts[1] : `${parts[0]}: ${parts[1]}`
}

export const registryUrlOf = (it: RegistryDetails) => {
  switch (it.type) {
    case 'hub':
      return REGISTRY_HUB_URL
    case 'v2':
      return it.url
    case 'gitlab':
      return it.selfManaged ? it.url : REGISTRY_GITLAB_URLS.registryUrl
    case 'github':
      return REGISTRY_GITHUB_URL
  }
}

export const registryDetailsToRegistry = (it: RegistryDetails): Registry => {
  return {
    ...it,
    url: registryUrlOf(it),
  }
}