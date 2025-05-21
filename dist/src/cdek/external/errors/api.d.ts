import { InvalidRequest } from '../types/lib';
export declare class ApiError extends Error {
    response: InvalidRequest;
    constructor(response: InvalidRequest, message: string);
}
