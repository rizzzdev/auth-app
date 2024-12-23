import { RegisterService } from './register.service';
import { Request, Response } from 'express';
export declare class RegisterController {
    private readonly registerService;
    constructor(registerService: RegisterService);
    register(request: Request, response: Response): Promise<void>;
}
