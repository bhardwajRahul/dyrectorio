import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration, FrontendApi, Identity, IdentityApi, Session } from '@ory/kratos-client'
import { randomUUID } from 'crypto'
import { IdentityTraits, KratosInvitation, KRATOS_IDENTITY_SCHEMA } from 'src/shared/models'

@Injectable()
export default class KratosService {
  private identity: IdentityApi

  private frontend: FrontendApi

  constructor(config: ConfigService) {
    this.identity = new IdentityApi(new Configuration({ basePath: config.get<string>('KRATOS_ADMIN_URL') }))
    this.frontend = new FrontendApi(new Configuration({ basePath: config.get<string>('KRATOS_URL') }))
  }

  async getIdentityByEmail(email: string): Promise<Identity> {
    const identities = await this.identity.listIdentities()
    return identities.data.find(user => {
      const traits = user.traits as IdentityTraits
      return traits.email === email
    })
  }

  async getIdentitiesByIds(ids: Set<string>): Promise<Map<string, Identity>> {
    const identities = await this.identity.listIdentities()

    return new Map(identities.data.filter(it => ids.has(it.id)).map(it => [it.id, it]))
  }

  async getSessionsById(id: string, activeOnly?: boolean): Promise<Session[]> {
    const sessions = await this.identity.listIdentitySessions({
      id,
      active: activeOnly,
    })
    return sessions.data ?? []
  }

  async getSessionsByIds(ids: string[], activeOnly?: boolean): Promise<Map<string, Session[]>> {
    const data = await Promise.all(
      ids.map(async (it: string): Promise<[string, Session[]]> => {
        const sessions = await this.getSessionsById(it, activeOnly)
        return [it, sessions]
      }),
    )
    return new Map(data)
  }

  async createUser(traits: IdentityTraits): Promise<Identity> {
    const res = await this.identity.createIdentity({
      createIdentityBody: {
        schema_id: KRATOS_IDENTITY_SCHEMA,
        traits,
        verifiable_addresses: [
          {
            id: randomUUID(),
            status: 'completed',
            value: traits.email,
            verified: true,
            via: 'email',
          },
        ],
      },
    })

    return res.data
  }

  async createInvitation(identity: Identity): Promise<KratosInvitation> {
    const res = await this.identity.createRecoveryCodeForIdentity({
      createRecoveryCodeForIdentityBody: {
        identity_id: identity.id,
        expires_in: '12h',
      },
    })

    const url = new URL(res.data.recovery_link)

    return {
      flow: url.searchParams.get('flow'),
      code: res.data.recovery_code,
    }
  }

  async getIdentityById(id: string): Promise<Identity> {
    const res = await this.identity.getIdentity({
      id,
    })

    return res.data
  }

  async getIdentityIdsByEmail(email: string): Promise<string[]> {
    const identitites = await this.identity.listIdentities()

    return identitites.data
      .filter(it => {
        const traits = it.traits as IdentityTraits
        return traits.email.includes(email)
      })
      .map(it => it.id)
  }

  async getSessionByCookie(cookie: string): Promise<Session> {
    const req = await this.frontend.toSession({
      cookie,
    })
    return req.data
  }
}
