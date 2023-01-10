import { AccessTokenException } from './../../exceptions/index';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard("jwt") {
    constructor(
        private reflector: Reflector,
    ) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride("isPublic", [
            context.getHandler(),
            context.getClass(),
        ])

        if ( isPublic ) {
             return true;
        }

        return super.canActivate(context);
    }

    handleRequest<User = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): User {

        if ( info instanceof Error ) {
            throw new AccessTokenException();
        }

        return user;
    }

}