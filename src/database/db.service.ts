import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
  // constructor() {
  //   super({
  //     log: ['query'],
  //   });
  //   // this.$use((params, next) => {
  //   //   console.log('action: ' + params.action);
  //   //   if (params.action === 'findMany') {
  //   //     console.log('params: ' + JSON.stringify(params.args));
  //   //   }
  //   //   return next(params);
  //   // });
  // }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
