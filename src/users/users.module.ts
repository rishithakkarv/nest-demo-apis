import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { AuthorizeMiddleware } from './middlewares/authorize.middleware';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthorizeMiddleware)
      .forRoutes(UsersController)
  }
}
