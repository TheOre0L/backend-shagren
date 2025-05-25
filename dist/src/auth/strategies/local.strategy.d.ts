import { Strategy } from 'passport-local';
import { ModuleRef } from '@nestjs/core';
import { Request } from 'express';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private moduleRef;
    private readonly log;
    constructor(moduleRef: ModuleRef);
    validate(request: Request, email: string, password: string): Promise<{
        id: string;
        password: string;
        email: string;
        fio: string;
        city: string;
        view: boolean;
        role: number;
        telephone: string;
        refreshToken: string | null;
        isActive: boolean;
    }>;
}
export {};
