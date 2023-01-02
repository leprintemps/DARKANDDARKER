import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [BoardModule, UserModule,
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
  providers: [AppService],
})
export class AppModule {}
