import { UnauthorizedException } from '@nestjs/common';

export class AccessTokenException extends UnauthorizedException {
    constructor() {
        super("Access token has error.");
    }
}

export class RefreshTokenException extends UnauthorizedException {
    constructor() {
        super("Refresh token has error.");
    }
}