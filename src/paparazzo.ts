// 事件处理器类型
type EventHandler = (payload?: any) => void;

// 事件哈希集合类型
interface IEventsMap {
    [propName: string]: IEventMapItem[];
}

interface IEventMapItem {
    handler: EventHandler;
    originHandler: EventHandler;
    [propName: string]: any;
}

interface IEventHandlersMap {
    [propName: string]: EventHandler[] | EventHandler;
}

// Paparazzo实例对象配置类型
interface IConfig {
    separator?: string; // 事件名分隔符
    [propName: string]: any;
}

/**
 * 判断一个目标是否为对象类型
 * @param target 需要检测的目标对象
 * @returns boolean true表示是对象类型，false表示不是对象类型
 */
const isObject = (target: any): boolean => {
    return typeof target === 'object' && target != null;
};

/**
 * 判断一个目标是否为函数类型
 * @param target 需要检测的目标对象
 * @returns boolean true表示是函数类型，false表示函数对象类型
 */
const isFunction = (target: any): boolean => {
    return typeof target === 'function';
};

export class Paparazzo {

    // 存储事件处理器集合或事件处理器与事件名的map集合，
    // key为事件名，value为事件处理器集合或事件处理器
    private eventsMap: IEventsMap = {};

    // 配置对象
    private config: IConfig = {
        separator: ' ', // 事件名分隔符
    };

    constructor(config?: IConfig) {
        if (isObject(config)) {
            this.config = (Object as any).assign(this.config, config);
        }
    }

    /**
     * 根据事件名风格符对事件名字符串进行切割，默认风格符为空格
     * @param eventName 事件名
     */
    private splitEventNames(eventName: string): string[] {
        let names: string[] = eventName.split(this.config.separator ? this.config.separator : ' ');
        names = names.map((name: string) => {
            return name.trim();
        }).filter((name: string) => {
            return (name.trim()).length > 0;
        });
        return names;
    }

    /**
     * 为指定事件添加处理器
     * @param eventName  事件名
     * @param handler 事件处理器或处理器集合
     * @param once 是否只监听一次，true 表示是，false表示不是，默认为false
     * @param prepend 是否将处理器添加到该事件处理器队列的最前方，true 表示是，false表示不是，默认为false
     */
    private addEventHandlers(eventName: string, handler: EventHandler[] | EventHandler, once?: boolean, prepend?: boolean): Paparazzo {
        if (!eventName) {
            return this;
        }
        this.splitEventNames(eventName)
            .forEach((name: string) => {
                if (!this.eventsMap[name]) {
                    this.eventsMap[name] = [];
                }
                let handlers: EventHandler[] = [];
                if (!Array.isArray(handler)) {
                    handlers = [handler];
                } else {
                    handlers = handler;
                }
                const queue = handlers.filter((fn) => isFunction(fn)).map((fn) => {
                    const item = {
                        originHandler: fn,
                        handler: fn,
                    };
                    if (once) {
                        item.handler = (...args: any[]) => {
                            this.off(name, fn);
                            fn(...args);
                        };
                    }
                    return item;
                });

                if (prepend) {
                    this.eventsMap[name] = queue.concat(this.eventsMap[name]);
                } else {
                    this.eventsMap[name] = (this.eventsMap[name]).concat(queue);
                }
            });
        return this;
    }

    /**
     * 对事件的处理器进行迭代处理
     * @param eventName 事件名,如果需要对多个事件进行监听，可以用事件分隔符隔开，默认为空格
     * @param process 迭代处理
     * @param args 迭代处理器的入参
     */
    private processEvents(eventName: string, process: any, ...args: any[]): Paparazzo {
        this.splitEventNames(eventName)
            .forEach((name: string) => {
                (this.eventsMap[name] || []).forEach((handler) => {
                    process(name, handler.handler, ...args);
                });
            });
        return this;
    }

    /**
     * 对事件进行监听
     * @param eventName 事件名,如果需要对多个事件进行监听，可以用事件分隔符隔开，默认为空格
     * @param handlers 事件处理器或事件处理器集合
     * @param once 是否只监听一次,true 表示是，false表示不是
     * @param prepend 是否将处理器添加到该事件处理器队列的最前方，true 表示是，false表示不是，默认为false
     */
    public on(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean, prepend?: boolean): Paparazzo;

    /**
     * 对事件集合进行监听
     * @param eventHandlersMap 事件集合对象，键为要监听的事件名，值为对应事件处理器
     * @param once 是否只监听一次,true 表示是，false表示不是
     * @param prepend 是否将处理器添加到该事件处理器队列的最前方，true 表示是，false表示不是，默认为false
     */
    public on(eventHandlersMap: IEventHandlersMap, once?: boolean, prepend?: boolean): Paparazzo;

    /**
     * 对指定事件进行监听
     */
    public on(...args: any[]): Paparazzo {
        if (isObject(args[0])) {
            const eventsMap: IEventHandlersMap = args[0];
            const once: boolean = !!args[1];
            const prepend: boolean = !!args[2];
            Object.keys(eventsMap).forEach((eventName: string) => {
                this.addEventHandlers(eventName, eventsMap[eventName], once, prepend);
            });
        } else {
            const eventNames: string = args[0];
            const handlers: EventHandler[] | EventHandler = args[1];
            const once: boolean = !!args[2];
            const prepend: boolean = !!args[3];
            this.addEventHandlers(eventNames, handlers, once, prepend);
        }
        return this;
    }

    /**
     * 对事件进行监听，并将处理器添加到该事件处理器队列的最前方
     * @param eventName 事件名,如果需要对多个事件进行监听，可以用事件分隔符隔开，默认为空格
     * @param handlers 事件处理器或事件处理器集合
     * @param once 是否只监听一次
     */
    public prependListener(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean): Paparazzo;

    /**
     * 对事件进行监听，并将处理器添加到该事件处理器队列的最前方
     * @param eventHandlersMap 事件集合对象，键为要监听的事件名，值为对应事件处理器
     * @param once 是否只监听一次
     */
    public prependListener(eventHandlersMap: IEventHandlersMap, once?: boolean): Paparazzo;

    /**
     * 对事件进行监听，并将处理器添加到该事件处理器队列的最前方
     */
    public prependListener(...args: any[]): Paparazzo {
        if (isObject(args[0])) {
            return this.on.call(this, args[0], args[1], true);
        } else {
            return this.on.call(this, args[0], args[1], args[2], true);
        }
    }

    /**
     * 对事件进行一次性监听，并将处理器添加到该事件处理器队列的最前方
     * @param eventName 事件名,如果需要对多个事件进行监听，可以用事件分隔符隔开，默认为空格
     * @param handlers 事件处理器或事件处理器集合
     */
    public prependOnceListener(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;

    /**
     * 对事件进行一次性监听，并将处理器添加到该事件处理器队列的最前方
     * @param eventHandlersMap 事件集合对象，键为要监听的事件名，值为对应事件处理器
     */
    public prependOnceListener(eventHandlersMap: IEventHandlersMap): Paparazzo;

    /**
     * 对事件进行一次性监听，并将处理器添加到该事件处理器队列的最前方
     */
    public prependOnceListener(...args: any[]): Paparazzo {
        if (isObject(args[0])) {
            return this.on.call(this, args[0], true, true);
        } else {
            return this.on.call(this, args[0], args[1], true, true);
        }
    }

    /**
     * 对事件进行监听
     * @param eventName 事件名,如果需要对多个事件进行监听，可以用事件分隔符隔开，默认为空格
     * @param handlers 事件处理器或事件处理器集合
     */
    public once(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;

    /**
     * 对事件集合进行监听
     * @param eventHandlersMap 事件集合对象，键为要监听的事件名，值为对应事件处理器
     */
    public once(eventHandlersMap: IEventHandlersMap): Paparazzo;

    /**
     * 对指定事件进行一次性监听，当事件触发后，事件将从事件处理中移除
     */
    public once(...args: any[]): Paparazzo {
        this.on.call(this, args[0], args[1], true, false);
        return this;
    }

    /**
     * 触发指定事件并发送相关数据
     * @param eventName 事件名，如果需要对多个事件进行触发时，可以用事件分隔符隔开，默认为空格
     * @param payload 事件需要处理的数据
     */
    public emit(eventName: string, payload?: any): Paparazzo {
        return this.processEvents(eventName, (name: string, handler: EventHandler, payload: any) => {
            handler(payload);
        }, payload);
    }

    /**
     * 对指定事件进行移除
     * @param eventName 事件名，如果需要对多个事件名进行触发时，可以用事件分隔符隔开，默认为空格
     * @param handler 需要移除的处理器集合或处理器
     */
    public off(eventName: string, handler?: EventHandler[] | EventHandler): Paparazzo {
        let eventsMap: IEventMapItem[] = (this.eventsMap[eventName] || []);
        if (!handler) {
            this.splitEventNames(eventName).forEach((name: string) => {
                delete this.eventsMap[name];
            });
        } else {
            const targetHandlers = Array.isArray(handler) ? handler : [handler];
            this.splitEventNames(eventName).forEach((name: string) => {
                targetHandlers.forEach((targetHandler) => {
                    const size = eventsMap.length;
                    for (let i = 0; i < size; i++) {
                        if (eventsMap[i]['originHandler'] === targetHandler) {
                            this.eventsMap[name] = eventsMap = eventsMap.slice(0, i).concat(eventsMap.slice(i + 1));
                            break;
                        }
                    }
                });
            });
        }
        return this;
    }

    /**
     * 获取全部监听的事件名
     */
    public eventNames(): string[] {
        return Object.keys(this.eventsMap);
    }

    /**
     * 获取指定事件名的处理器集合
     * @param eventName 事件名
     */
    public listeners(eventName: string): EventHandler[] {
        return (this.eventsMap[eventName] || []).map((item) => item.originHandler);
    }
}
