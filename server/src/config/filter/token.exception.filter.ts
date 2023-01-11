import { HttpException, UnauthorizedException } from '@nestjs/common';
import { AccessTokenException, RefreshTokenException } from '../exceptions/index';
import { ArgumentsHost } from '@nestjs/common';
import { Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class TokenExceptionFilter implements ExceptionFilter {

    catch(exception: Error, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        // TODO : 추후 상수로 바꿔 적용할 것.
        let code = "";

        if ( exception instanceof AccessTokenException ) {
            code = "AT_401";
        }

        if ( exception instanceof RefreshTokenException ) {
            code = "RT_401";
        }

        const response = ( exception as UnauthorizedException ).getResponse();

        res.status((exception as HttpException).getStatus());
        res.json({ response, code });
    }

}