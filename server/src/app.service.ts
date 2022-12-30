import { Injectable } from '@nestjs/common';

/***
 * Service
 * 비즈니스 로직을 처리하는 존재
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello RimWorld!';
  }
  getHi(): string {
    return 'hi';
  }
}
