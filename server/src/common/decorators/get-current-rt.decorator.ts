import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/*
    rt.strategy.ts 에서 반환한 데이터에서 request.rt를 반환함.
*/
export const GetCurrentRt = createParamDecorator(
    (data: undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user["rt"];
    },
)