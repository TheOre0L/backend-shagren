export declare class CreateUserDto {
    fio: string;
    password: string;
    telephone: string;
    email: string;
    role: 'admin' | 'user';
    isActive: boolean;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export declare class LoginDTO {
    email: string;
    password: string;
}
export declare class RegistrationDTO {
    fio: string;
    password: string;
    telephone: string;
    email: string;
    city: string;
}
export {};
