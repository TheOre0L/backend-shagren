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
  }; // FIXME
  auth: AuthConfig; // FIXME
  uploadPath: string;
  delivery: {
    cdek: CDEKConfig;
  };
  payment: {
    yookassa: YooKassaConfig;
  };
}

export default (): IConfig => ({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  uploadPath: process.env.UPLOAD_PATH || 'uploads', // Путь для загрузок
  auth: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'change_me',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'change_me',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '14d',
  },
  delivery: {
    cdek: {
      enabled: !!process.env.CDEK_ACCOUNT_ID,
      account: process.env.CDEK_ACCOUNT_ID,
      password: process.env.CDEK_PASSWORD,
      url_base: process.env.CDEK_URL_BASE,
    },
  },
  payment: {
    yookassa: {
      enabled: !!process.env.YOOKASSA_SHOP_ID,
      shopId: process.env.YOOKASSA_SHOP_ID || '',
      apiKey: process.env.YOOKASSA_API_KEY || '',
    },
  },
});
