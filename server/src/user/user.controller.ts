import { UserService } from './user.service';
import { Controller } from "@nestjs/common";

@Controller("auth")
export class UserController {

    constructor(
        private userService: UserService,
    ){
        
    }

}