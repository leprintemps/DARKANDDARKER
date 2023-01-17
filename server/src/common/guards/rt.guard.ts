import { RefreshTokenException } from '../../config/exceptions/token.exceptions';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class RtGuard extends AuthGuard("jwt-refresh") {
    constructor() {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest<User = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): User {

        if ( info instanceof Error ) {
            throw new RefreshTokenException();
        }

        return user;
    }
}