export declare class CreateUserDto {
    name: string;
    password: string;
    phone: string;
    email: string;
    role: 'admin' | 'user';
    isActive: boolean;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
