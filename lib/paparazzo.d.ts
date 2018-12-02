declare type EventHandler = (payload?: any) => void;
interface IEventsMap {
    [propName: string]: IEventMapItem[];
}
interface IEventMapItem {
    handler: EventHandler;
    originHandler: EventHandler;
    [propName: string]: any;
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
    on(eventHandlersMap: IEventsMap, once?: boolean, prepend?: boolean): Paparazzo;
    prependListener(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean): Paparazzo;
    prependListener(eventHandlersMap: IEventsMap, once?: boolean): Paparazzo;
    prependOnceListener(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;
    prependOnceListener(eventHandlersMap: IEventsMap): Paparazzo;
    once(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;
    once(eventHandlersMap: IEventsMap): Paparazzo;
    emmiter(eventName: string, payload?: any): Paparazzo;
    off(eventName: string, handler?: EventHandler[] | EventHandler): Paparazzo;
    eventNames(): string[];
    listeners(eventName: string): EventHandler[];
}
export {};
