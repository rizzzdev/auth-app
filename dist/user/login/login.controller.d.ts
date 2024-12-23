import { LoginService } from './login.service';
import { Request, Response } from 'express';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(request: Request, response: Response): Promise<void>;
}
