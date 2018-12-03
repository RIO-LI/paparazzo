declare type EventHandler = (payload?: any) => void;
interface IEventHandlersMap {
    [propName: string]: EventHandler[] | EventHandler;
}
interface IConfig {
    separator?: string;
    [propName: string]: any;
}
export declare class Paparazzo {
    private eventsMap;
    private config;
    constructor(config?: IConfig);
    private splitEventNames;
    private addEventHandlers;
    private processEvents;
    on(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean, prepend?: boolean): Paparazzo;
    on(eventHandlersMap: IEventHandlersMap, once?: boolean, prepend?: boolean): Paparazzo;
    prependListener(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean): Paparazzo;
    prependListener(eventHandlersMap: IEventHandlersMap, once?: boolean): Paparazzo;
    prependOnceListener(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;
    prependOnceListener(eventHandlersMap: IEventHandlersMap): Paparazzo;
    once(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;
    once(eventHandlersMap: IEventHandlersMap): Paparazzo;
    emit(eventName: string, payload?: any): Paparazzo;
    off(eventName: string, handler?: EventHandler[] | EventHandler): Paparazzo;
    eventNames(): string[];
    listeners(eventName: string): EventHandler[];
}
export {};
