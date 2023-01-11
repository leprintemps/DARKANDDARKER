import { AtGuard } from './common/guards/at.guard';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PostModule, 
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
    isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "test" ? "./env/test.env" : "./env/dev.env",
      validationSchema: Joi.object({
        MONGO_URL: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_URL'),
        connectionFactory: (connection) => {
          //join 할떄씀
          connection.plugin(require('mongoose-autopopulate'));
          connection.set({
            strict: true,
          });
          console.log("Connected to DB🚀");
          return connection;
        },
        connectionErrorFactory:(error) =>{
          console.log("DB error", error);
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    }
  ],
})
export class AppModule {}
