import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException } from "@nestjs/common";
import { Request, Response } from "express";

/*
    에러를 콘솔에 출력하기 위한 exception filter
*/
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: Error, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        // HttpException이 아니면 모두 InternalServerErrorException 으로 처리
        if ( !(exception instanceof HttpException) ) {
            exception = new InternalServerErrorException();
        }

        const response = ( exception as HttpException ).getResponse();

        const log = {
            timestamp: new Date(),
            url: req.url,
            response,
        }

        console.error(":::ERROR::: = ", log);

        res.status((exception as HttpException).getStatus());
        res.json(response);
    }

}