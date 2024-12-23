import { UserService } from './user.service';
import { Request, Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(response: Response): Promise<void>;
    getNewAccessToken(request: Request, response: Response): Promise<void>;
}
