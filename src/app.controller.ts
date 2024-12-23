import { Controller, Get } from '@nestjs/common';

@Controller(['/api', 'api/v1', ''])
export class AppController {
  @Get()
  sayHello() {
    return {
      author: 'Rizzz.Dev',
      description: 'API for Auth App',
    };
  }
}
