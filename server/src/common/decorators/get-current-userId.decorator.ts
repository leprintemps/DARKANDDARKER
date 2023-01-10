import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/*
    at.strategy.ts에서 반환한 데이터에서 request.user.sub를 반환함. ( sub == user._id )
*/
export const GetCurrentUserId = createParamDecorator(
    (data: undefined, context: ExecutionContext): string => {
        const request = context.switchToHttp().getRequest();
        return request.user["sub"];
    },
)