"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const isNullish = (value) => value === null || value === undefined;
class EventEmitter {
    listeners = {};
    globalWriters = [];
    onWriters = {};
    limit;
    constructor(maxListenersPerEvent) {
        this.limit = maxListenersPerEvent ?? 10;
    }
    on(eventName, listener) {
        if (listener) {
            if (!this.listeners[eventName]) {
                this.listeners[eventName] = [];
            }
            if (this.limit !== 0 && this.listeners[eventName].length >= this.limit) {
                throw new TypeError('Listeners limit reached: limit is ' + this.limit);
            }
            this.listeners[eventName].push({
                once: false,
                cb: listener,
            });
            return this;
        }
        else {
            if (!this.onWriters[eventName]) {
                this.onWriters[eventName] = [];
            }
            if (this.limit !== 0 && this.onWriters[eventName].length >= this.limit) {
                throw new TypeError('Listeners limit reached: limit is ' + this.limit);
            }
            const { readable, writable } = new TransformStream();
            this.onWriters[eventName].push(writable.getWriter());
            return readable[Symbol.asyncIterator]();
        }
    }
    once(eventName, listener) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        if (this.limit !== 0 && this.listeners[eventName].length >= this.limit) {
            throw new TypeError('Listeners limit reached: limit is ' + this.limit);
        }
        if (listener) {
            this.listeners[eventName].push({
                once: true,
                cb: listener,
            });
            return this;
        }
        else {
            return new Promise((res) => {
                this.listeners[eventName].push({
                    once: true,
                    cb: (...args) => res(args),
                });
            });
        }
    }
    async off(eventName, listener) {
        if (!isNullish(eventName)) {
            if (listener) {
                this.listeners[eventName] = this.listeners[eventName]?.filter(({ cb }) => cb !== listener);
            }
            else {
                if (this.onWriters[eventName]) {
                    for (const writer of this.onWriters[eventName]) {
                        await writer.close();
                    }
                    delete this.onWriters[eventName];
                }
                delete this.listeners[eventName];
            }
        }
        else {
            for (const writers of Object.values(this.onWriters)) {
                for (const writer of writers) {
                    await writer.close();
                }
            }
            this.onWriters = {};
            for (const writer of this.globalWriters) {
                await writer.close();
            }
            this.globalWriters = [];
            this.listeners = {};
        }
        return this;
    }
    async emit(eventName, ...args) {
        const listeners = this.listeners[eventName]?.slice() ?? [];
        for (const { cb, once } of listeners) {
            cb(...args);
            if (once) {
                this.off(eventName, cb);
            }
        }
        if (this.onWriters[eventName]) {
            for (const writer of this.onWriters[eventName]) {
                await writer.write(args);
            }
        }
        for (const writer of this.globalWriters) {
            await writer.write({
                name: eventName,
                value: args,
            });
        }
    }
    [Symbol.asyncIterator]() {
        if (this.limit !== 0 && this.globalWriters.length >= this.limit) {
            throw new TypeError('Listeners limit reached: limit is ' + this.limit);
        }
        const { readable, writable } = new TransformStream();
        this.globalWriters.push(writable.getWriter());
        return readable[Symbol.asyncIterator]();
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=eventemitter.js.map