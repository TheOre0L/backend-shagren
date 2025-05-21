"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClient = void 0;
const api_1 = require("../errors/api");
const auth_1 = require("../errors/auth");
const http_1 = require("../errors/http");
class RestClient {
    _token;
    _token_expire;
    account;
    password;
    grant_type;
    url_base;
    _last_headers;
    on_error;
    constructor(options) {
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
    async auth() {
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
            throw new auth_1.AuthError(await res.text(), {
                cause: `${res.status} ${res.statusText}`,
            });
        }
        this._token = await res.json();
        this._token_expire = Date.now() + (this.token?.expires_in ?? 3600) * 1000;
    }
    async request(init) {
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
                    throw new api_1.ApiError(await res.json(), `${res.status} ${res.statusText}, ${res.url}`);
                }
                else {
                    throw new http_1.HttpError('HttpError\n' + (await res.text()));
                }
            }
            this._last_headers = res.headers;
            return (await res.json());
        }
        catch (err) {
            if (this.on_error) {
                this.on_error(err);
                return null;
            }
            else {
                throw err;
            }
        }
    }
    get(init) {
        return this.request({ ...init, method: 'GET' });
    }
    post(init) {
        return this.request({ ...init, method: 'POST' });
    }
    put(init) {
        return this.request({ ...init, method: 'PUT' });
    }
    patch(init) {
        return this.request({ ...init, method: 'PATCH' });
    }
    delete(init) {
        return this.request({ ...init, method: 'DELETE' });
    }
    params(query) {
        return new URLSearchParams(Object.entries(query).map((item) => [
            item[0],
            item[1].toString(),
        ]));
    }
}
exports.RestClient = RestClient;
//# sourceMappingURL=restclient.js.map