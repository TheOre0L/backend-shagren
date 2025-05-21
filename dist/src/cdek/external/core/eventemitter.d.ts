type Entry<E, K extends keyof E> = {
    name: K;
    value: E[K];
};
export declare class EventEmitter<E extends Record<string, unknown[]>> {
    private listeners;
    private globalWriters;
    private onWriters;
    private limit;
    constructor(maxListenersPerEvent?: number);
    on<K extends keyof E>(eventName: K, listener: (...args: E[K]) => void): this;
    on<K extends keyof E>(eventName: K): AsyncIterableIterator<E[K]>;
    once<K extends keyof E>(eventName: K, listener: (...args: E[K]) => void): this;
    once<K extends keyof E>(eventName: K): Promise<E[K]>;
    off<K extends keyof E>(eventName?: K, listener?: (...args: E[K]) => void): Promise<this>;
    protected emit<K extends keyof E>(eventName: K, ...args: E[K]): Promise<void>;
    [Symbol.asyncIterator]<K extends keyof E>(): AsyncIterableIterator<{
        [V in K]: Entry<E, V>;
    }[K]>;
}
export {};
