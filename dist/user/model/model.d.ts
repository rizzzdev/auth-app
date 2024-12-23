import { ZodIssue } from 'zod';
export interface RegisterRequest {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}
export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginData {
    username: string;
    refreshToken: string;
    accessToken: string;
}
export declare enum Status {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500
}
export interface Response<T> {
    error: boolean;
    status: Status;
    issues: ZodIssue | null | {
        message: string;
    };
    data?: T;
}
