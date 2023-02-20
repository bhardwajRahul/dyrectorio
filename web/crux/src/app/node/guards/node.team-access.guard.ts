import { Injectable } from '@nestjs/common'
import { IdRequest } from 'src/grpc/protobuf/proto/crux'
import UserAccessGuard from 'src/shared/user-access.guard'

@Injectable()
export default class NodeTeamAccessGuard extends UserAccessGuard {
  async canActivateWithIdRequest(request: IdRequest): Promise<boolean> {
    const nodes = await this.prisma.node.count({
      where: {
        id: request.id,
        team: {
          users: {
            some: {
              userId: request.accessedBy,
              active: true,
            },
          },
        },
      },
    })

    return nodes > 0
  }
}