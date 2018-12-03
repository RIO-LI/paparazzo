var isObject = function (target) {
    return typeof target === 'object' && target != null;
};
var isFunction = function (target) {
    return typeof target === 'function';
};
var Paparazzo = (function () {
    function Paparazzo(config) {
        this.eventsMap = {};
        this.config = {
            separator: ' ',
        };
        if (isObject(config)) {
            this.config = Object.assign(this.config, config);
        }
    }
    Paparazzo.prototype.splitEventNames = function (eventName) {
        var names = eventName.split(this.config.separator ? this.config.separator : ' ');
        names = names.map(function (name) {
            return name.trim();
        }).filter(function (name) {
            return (name.trim()).length > 0;
        });
        return names;
    };
    Paparazzo.prototype.addEventHandlers = function (eventName, handler, once, prepend) {
        var _this = this;
        if (!eventName) {
            return this;
        }
        this.splitEventNames(eventName)
            .forEach(function (name) {
            if (!_this.eventsMap[name]) {
                _this.eventsMap[name] = [];
            }
            var handlers = [];
            if (!Array.isArray(handler)) {
                handlers = [handler];
            }
            else {
                handlers = handler;
            }
            var queue = handlers.filter(function (fn) { return isFunction(fn); }).map(function (fn) {
                var item = {
                    originHandler: fn,
                    handler: fn,
                };
                if (once) {
                    item.handler = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.off(name, fn);
                        fn.apply(void 0, args);
                    };
                }
                return item;
            });
            if (prepend) {
                _this.eventsMap[name] = queue.concat(_this.eventsMap[name]);
            }
            else {
                _this.eventsMap[name] = (_this.eventsMap[name]).concat(queue);
            }
        });
        return this;
    };
    Paparazzo.prototype.processEvents = function (eventName, process) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.splitEventNames(eventName)
            .forEach(function (name) {
            (_this.eventsMap[name] || []).forEach(function (handler) {
                process.apply(void 0, [name, handler.handler].concat(args));
            });
        });
        return this;
    };
    Paparazzo.prototype.on = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isObject(args[0])) {
            var eventsMap_1 = args[0];
            var once_1 = !!args[1];
            var prepend_1 = !!args[2];
            Object.keys(eventsMap_1).forEach(function (eventName) {
                _this.addEventHandlers(eventName, eventsMap_1[eventName], once_1, prepend_1);
            });
        }
        else {
            var eventNames = args[0];
            var handlers = args[1];
            var once = !!args[2];
            var prepend = !!args[3];
            this.addEventHandlers(eventNames, handlers, once, prepend);
        }
        return this;
    };
    Paparazzo.prototype.prependListener = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isObject(args[0])) {
            return this.on.call(this, args[0], args[1], true);
        }
        else {
            return this.on.call(this, args[0], args[1], args[2], true);
        }
    };
    Paparazzo.prototype.prependOnceListener = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (isObject(args[0])) {
            return this.on.call(this, args[0], true, true);
        }
        else {
            return this.on.call(this, args[0], args[1], true, true);
        }
    };
    Paparazzo.prototype.once = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.on.call(this, args[0], args[1], true, false);
        return this;
    };
    Paparazzo.prototype.emit = function (eventName, payload) {
        return this.processEvents(eventName, function (name, handler, payload) {
            handler(payload);
        }, payload);
    };
    Paparazzo.prototype.off = function (eventName, handler) {
        var _this = this;
        var eventsMap = (this.eventsMap[eventName] || []);
        if (!handler) {
            this.splitEventNames(eventName).forEach(function (name) {
                delete _this.eventsMap[name];
            });
        }
        else {
            var targetHandlers_1 = Array.isArray(handler) ? handler : [handler];
            this.splitEventNames(eventName).forEach(function (name) {
                targetHandlers_1.forEach(function (targetHandler) {
                    var size = eventsMap.length;
                    for (var i = 0; i < size; i++) {
                        if (eventsMap[i]['originHandler'] === targetHandler) {
                            _this.eventsMap[name] = eventsMap = eventsMap.slice(0, i).concat(eventsMap.slice(i + 1));
                            break;
                        }
                    }
                });
            });
        }
        return this;
    };
    Paparazzo.prototype.eventNames = function () {
        return Object.keys(this.eventsMap);
    };
    Paparazzo.prototype.listeners = function (eventName) {
        return (this.eventsMap[eventName] || []).map(function (item) { return item.originHandler; });
    };
    return Paparazzo;
}());
export { Paparazzo };
//# sourceMappingURL=paparazzo.js.map