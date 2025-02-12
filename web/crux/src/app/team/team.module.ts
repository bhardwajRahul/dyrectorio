import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import EmailBuilder from 'src/builders/email.builder'
import NotificationTemplateBuilder from 'src/builders/notification.template.builder'
import InterceptorGrpcHelperProvider from 'src/interceptors/helper.interceptor'
import EmailModule from 'src/mailer/email.module'
import EmailService from 'src/mailer/email.service'
import DomainNotificationService from 'src/services/domain.notification.service'
import KratosService from 'src/services/kratos.service'
import PrismaService from 'src/services/prisma.service'
import SharedModule from '../shared/shared.module'
import TeamHttpController from './team.http.controller'
import TeamMapper from './team.mapper'
import TeamRepository from './team.repository'
import TeamService from './team.service'
import UserHttpController from './user.http.controller'

@Module({
  imports: [HttpModule, EmailModule, SharedModule],
  exports: [TeamRepository, TeamService],
  controllers: [TeamHttpController, UserHttpController],
  providers: [
    TeamService,
    TeamRepository,
    PrismaService,
    EmailService,
    KratosService,
    TeamMapper,
    InterceptorGrpcHelperProvider,
    EmailBuilder,
    NotificationTemplateBuilder,
    DomainNotificationService,
  ],
})
export default class TeamModule {}
