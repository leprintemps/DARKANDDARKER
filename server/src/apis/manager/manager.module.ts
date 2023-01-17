import { Manager, ManagerSchema } from '../../schema/manager.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { ManagerController } from "./manager.controller";
import { ManagerService } from "./manager.service";

@Module({
    imports:[MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }])],
    controllers: [ManagerController],
    providers: [ManagerService],
    exports: [],
})
export class ManagerModule {};