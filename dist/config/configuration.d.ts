export interface CDEKConfig {
    enabled: boolean;
    account?: string;
    password?: string;
    url_base?: string;
}
export interface AuthConfig {
    accessSecret: string;
    accessExpiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
}
export interface YooKassaConfig {
    enabled: boolean;
    shopId?: string;
    apiKey?: string;
}
export interface IConfig {
    host: string;
    port: number;
    database: {
        url?: string;
    };
    auth: AuthConfig;
    uploadPath: string;
    delivery: {
        cdek: CDEKConfig;
    };
    payment: {
        yookassa: YooKassaConfig;
    };
}
declare const _default: () => IConfig;
export default _default;
