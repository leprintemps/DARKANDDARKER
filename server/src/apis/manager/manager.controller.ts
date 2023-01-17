import { CreateManagerDto } from '../../dto/manager.dto';
import { Controller, Post } from "@nestjs/common";
import { ManagerService } from "./manager.service";

@Controller("manage")
export class ManagerController {

    constructor(
        private managerService: ManagerService,
    ){}

    // 관리자 목록 조회

    // 관리자 생성
    @Post("")
    async createManager(managerDto : CreateManagerDto) : Promise<any> {
        return this.managerService.createManager(managerDto);
    }

    // 관리자 수정

    // 관리자 삭제

}