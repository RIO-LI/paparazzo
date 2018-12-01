declare type EventHandler = (payload?: any) => void;
interface EventsMap {
    [propName: string]: EventHandler[] | EventHandler;
}
interface Config {
    separator?: string;
    [propName: string]: any;
}
export declare class Paparazzo {
    private eventsMap;
    private onceEvenstMap;
    private config;
    constructor(config?: Config);
    private splitEventNames;
    private addEventHandlers;
    private processEvents;
    on(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean, prepend?: boolean): Paparazzo;
    on(eventHandlersMap: EventsMap, once?: boolean, prepend?: boolean): Paparazzo;
    prependListener(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean): Paparazzo;
    prependListener(eventHandlersMap: EventsMap, once?: boolean): Paparazzo;
    prependOnceListener(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;
    prependOnceListener(eventHandlersMap: EventsMap): Paparazzo;
    once(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;
    once(eventHandlersMap: EventsMap): Paparazzo;
    emmiter(eventName: string, payload?: any): Paparazzo;
    off(eventName: string): Paparazzo;
    eventNames(): string[];
    onceEventNames(): string[];
    listeners(eventName: string): EventHandler[];
}
export {};
