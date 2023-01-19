import { Manager } from '../../schema/manager.schema';
import { CreateManagerDto } from '../../dto/manager.dto';
import { ManagerDocument } from '../../schema/manager.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class ManagerService {

    constructor(
        @InjectModel(Manager.name) 
        private managerModel: Model<ManagerDocument>,
    ){}

    // 관리자 목록 조회

    // 관리자 생성
    async createManager(managerDto : CreateManagerDto) : Promise<any> {
        const createdManager = await this.managerModel.create({
            ...managerDto,
        })

        return createdManager;
    }

    // 관리자 수정

    // 관리자 삭제
    
}