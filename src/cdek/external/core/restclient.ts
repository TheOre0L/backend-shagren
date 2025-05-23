import { ApiError } from '../errors/api';
import { AuthError } from '../errors/auth';
import { HttpError } from '../errors/http';
import type { ApiResponse } from '../types/api';
import type { InitOptions, RequestInit, RequestMethod } from '../types/lib';

export class RestClient {
  private _token?: ApiResponse.OAuth;
  private _token_expire?: number;
  private account: string;
  private password: string;
  private grant_type: string;
  private url_base: string;
  private _last_headers: Headers;
  private on_error?: (
    error: Error | ApiError | AuthError | HttpError,
  ) => void | Promise<void>;

  constructor(options: InitOptions) {
    this.account = options.account;
    this.password = options.password;
    this.grant_type = options.grant_type ?? 'client_credentials';
    this.url_base = options.url_base ?? 'https://api.cdek.ru/v2';
    this.on_error = options.on_error;
  }
  get token() {
    return this._token;
  }

  get token_expire() {
    return this._token_expire;
  }

  get last_headers() {
    return this._last_headers;
  }

  async auth(): Promise<void> {
    const res = await fetch(this.url_base + '/oauth/token?parameters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: this.grant_type,
        client_id: this.account,
        client_secret: this.password,
      }),
    });

    if (res.ok === false) {
      throw new AuthError(await res.text(), {
        cause: `${res.status} ${res.statusText}`,
      });
    }

    this._token = await res.json();
    this._token_expire = Date.now() + (this.token?.expires_in ?? 3600) * 1000;
  }

  private async request<T>(
    init: RequestInit & { method: RequestMethod },
  ): Promise<T> {
    try {
      if (this.token_expire === undefined || Date.now() > this.token_expire) {
        await this.auth();
      }

      const target = `${this.url_base}${init.url}${init.query ? '?' + this.params(init.query) : ''}`;

      const res = await fetch(target, {
        method: init.method,
        headers: {
          Authorization: `Bearer ${this.token?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: init.payload ? JSON.stringify(init.payload) : undefined,
      });

      if (res.ok === false) {
        if (res.headers.get('Content-Type') === 'application/json') {
          throw new ApiError(
            await res.json(),
            `${res.status} ${res.statusText}, ${res.url}`,
          );
        } else {
          throw new HttpError('HttpError\n' + (await res.text()));
        }
      }

      this._last_headers = res.headers;

      return (await res.json()) as T;
    } catch (err) {
      if (this.on_error) {
        this.on_error(err);
        return null as T;
      } else {
        throw err;
      }
    }
  }

  get<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'GET' });
  }

  post<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'POST' });
  }

  put<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'PUT' });
  }

  patch<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'PATCH' });
  }

  delete<T>(init: RequestInit): Promise<T> {
    return this.request<T>({ ...init, method: 'DELETE' });
  }

  // deno-lint-ignore no-explicit-any
  private params(query: Record<string, any>): URLSearchParams {
    return new URLSearchParams(
      Object.entries(query).map<string[]>((item) => [
        item[0],
        item[1].toString(),
      ]),
    );
  }
}
