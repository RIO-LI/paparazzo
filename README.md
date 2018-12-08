# paparazzo

* [Synopsis](#Synopsis)
* [install](#install)
* [How to use](#HowToUse)
  * [Direct `<script>` Include](#DirectScriptInclude)
  * [CMD](#CMD)
  * [AMD](#AMD)
  * [ES Module](#ESModule)
* [Features & Usage](#Features&Usage)
* [Type & Interface](#Type&Interface)
* [API](#API)
  * [constructor([config])](#api-constructor)
  * [on(eventName, handlers, [once], [prepend])](#api-on-1)
  * [on(eventHandlersMap, [once], [prepend])](#api-on-2)
  * [prependListener(eventName, handlers, [once])](#api-prependListener-1)
  * [prependListener(eventHandlersMap,[once])](#api-prependListener-2)
  * [prependOnceListener(eventName, handlers)](#api-prependOnceListener-1)
  * [prependOnceListener(eventHandlersMap)](#api-prependOnceListener-2)
  * [once(eventName, handlers)](#api-once-1)
  * [once(eventHandlersMap)](#api-once-2)
  * [emit(eventName, [payload])](#api-emit)
  * [off(eventName, [handler])](#api-off)
  * [eventNames()](#api-eventNames)
  * [listeners(eventName)](#api-listeners)

<a name='Synopsis'></a>

## Synopsis
> Paparazzo is a simple, elegant and powerful event module that helps you quickly observe specific events, just like a paparazzi tracking celebrities.The code is written using the TypeScript approaches.But it have been converted into UMD module and ES5 formate code that can run in nodejs and browser.The most API style likes the Nodejs's Event module.If you are very skilled at Nodejs's Event module, you can get started quickly. 

---------------------------------------------------------------

<a name='install'></a>

## install
There are no dependencies. You need only npm installed and just run npm install to grab the development dependencies.All you need to do is run this command:

```bash
npm install --save hk-paparazzo
``` 

---------------------------------------------------------------

<a name='HowToUse'></a>

## How to use

<a name='DirectScriptInclude'></a>

### Direct `<script>` Include

You can download the production release from 
`https://github.com/RIO-LI/paparazzo/releases/latest`

Add them to your project directory.For example, If you put it in `lib/paparazzo`, so you can include `paparazzo` in the html as same as below:

```html
<!-- the production Release-->
<script src='myProject/lib/paparazzo.min.js'></script>
```
or
```html
<!-- the development Release-->
<script src='myProject/lib/paparazzo.js'></script>
```

```javascript
// in your javascript code 
var pz = new Paparazzo();
```

---------------------------------------------------------

<a name='CMD'></a>

### CMD

```javascript 
const Paparazzo = require("hk-paparazzo").Paparazzo;
const pz = new Paparazzo();
```

----------------------------------------------------------

<a name='AMD'></a>

### AMD
```javascript
require(['myProject/lib/paparazzo.js'/*'the path you config for paparazzo'*/], function(hkPaparazzo) {

const Paparazzo = hkPaparazzo.Paparazzo;
const pz = new Paparazzo();
})
```

-------------------------------------------------------------

<a name='ESModule'></a>

### ES Module

```javascript
import Paparazzo from 'hk-paparazzo';
const pz = new Paparazzo();
```

-------------------------------------------------------------

<a name='Features&Usage'></a>

## Features & Usage

-------------------------------------------------------------

```javascript

const Paparazzo = require("hk-paparazzo").Paparazzo;
const pz = new Paparazzo();

// observe `marry` event, and one handler
pz.on('marry', (data) => {
    // you want to do
});

// continue to  observe `marry` event, and  handlers
pz.on('marry', [(data) => {
    // you want to do
}, (data) => {
    // you want to do
}]);

// observe `gossip` and `affair` simultaneously,and add handlers
pz.on('gossip affair', [(data) => {
    // the parameter that handler receives is send from Paparazzo.emit() method
    console.log(`if you dispatch gossip or affair event, this function will be called`);
},(data) => {
    console.log(`if you dispatch gossip or affair event, this function will be called`);
}]);

// dispatch multiple events, and send data
pz.emit('gossip affair', {name: 'XXX'});

// Adds a one-time listener function for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked
pz.once('sleep', (data) => {
    console.log(`${data} is already asleep`);
});

pz.emit('sleep', {name: 'XXX'});

// give up watching an event
pz.off('marry');

// give up watching some events
pz.off('gossip affair');

```

-------------------------------------------------------------

<a name='Type&Interface'></a>

## Type & Interface
--------------------------------------------
> the paparazzo was written by typescript,the static type or interface and help you to understand what params the method want and what will be return from the method

```typescript

// the typeof event handler function
type EventHandler = (payload?: any) => void;

// a hash object consisting of  event name and handlers,
// key is event name, value is handlers of handler
interface IEventHandlersMap {
    [propName: string]: EventHandler[] | EventHandler;
}

// the configuration of Paparazzo instance
interface IConfig {
    // the separator of events,it's useful when want to observe or dispatch multiple events
    separator?: string; 
    [propName: string]: any; // external properties
}
```

<a name='API'></a>

## API

-----------------------------------------------

<a name='api-constructor'></a>

#### constructor(config?:IConfig):Paparazzo
the constructor of Paparazzo class, it has one parameter, the configuration of Paparazzo instance

**Example** 
```javascript
// use the default configuration, the event names are splited by space
const pz = new Paparazzo();

// observe  multiple events
hkPz.on('sleep eat', (data) => {
    // do  you want to do
});

// dispatch multiple events
hkPz.emit('sleep eat', {name: 'XXX'});


// use `:` as events names's separator, it useful when you want to custom event name style
const hkPz = new Paparazzo({separator: ':'});

// observe  multiple events
hkPz.on('sleep:eat', (data) => {
    // do  you want to do
});

// dispatch multiple events
hkPz.emit('sleep:eat', {name: 'XXX'});

```

<a name='api-on-1'></a>

#### on(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean, prepend?: boolean): Paparazzo;

> Adds the listener function to the listeners array for the event named eventName

- `eventName`: the event you want to observe, if you want to observe more event at a time, what you need to do is  separate the event names with the style characters that you config.

- `handlers`: the function called when event was dispatched, it can be a function or an array of function,
 the parameter that handlers receives is send from Paparazzo.emit() method.

- `once`: just observe event at a time, the default value is `false`.

- `prepend`: Adds the listener function to the beginning of the listeners array for the event named eventName, the default value if `false`.

**Example** 
```javascript
const pz = new Paparazzo();

// observe `marry` event, and one handler
pz.on('marry', (data) => {
    // you want to do
});

// continue to  observe `marry` event, and  handlers
pz.on('marry', [(data) => {
    // you want to do
}, (data) => {
    // you want to do
}]);

// observe `gossip` and `affair` simultaneously,and add handler
pz.on('gossip affair', (data) => {
    // the parameter that handler receives is send from Paparazzo.emit() method
    console.log(`if you dispatch gossip or affair event, this function will be called`);
});

// observe `gossip` and `affair` simultaneously,and add handlers
pz.on('gossip affair', [(data) => {
    // the parameter that handler receives is send from Paparazzo.emit() method
    console.log(`if you dispatch gossip or affair event, this function will be called`);
},(data) => {
    console.log(`if you dispatch gossip or affair event, this function will be called`);
}]);

// Adds a one-time listener function for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked
pz.on('fart', (data) => {
    // do what you want to do
},true);

// trigger the fart event,and the listeners of it will be removed
pz.emit('fart');

// adds the listener function to the beginning of the listeners array for the marry event
pz.on('marry', (data) => {
    // this listener will be invoked when the marry event is triggered
},false, true);

pz.emit('marry', {man: 'XXX', women: 'XXX'});

```

<a name='api-on-2'></a>

#### on(eventHandlersMap: IEventHandlersMap, once?: boolean, prepend?: boolean): Paparazzo;

> Adds the listener function to the listeners array for the event named eventName

- `eventHandlersMap`: a hash object consisting of  event name and handlers, key is event name, value is handlers of handler

- `once`: just observe event at a time, the default value is `false`.

- `prepend`: add the listener function to the beginning of the listeners array for the event named eventName, the default value if `false`.

**Example** 
```javascript
const pz = new Paparazzo();

pz.on({
    eat: (data)=> {
        // do what you want to do
    },
    sleep: [(data)=> {     

    }, (data)=> {

    }]
});
```

<a name='api-prependListener-1'></a>

#### prependListener(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean): Paparazzo;

> add the listeners function to the beginning of the listeners array for the event named eventName

- `eventName`: the event you want to observe, if you want to observe more event at a time, what you need to do is  separate the event names with the style characters that you config.

- `handlers`: the function called when event was dispatched, it can be a function or an array of function,
 the parameter that handlers receives is send from Paparazzo.emit() method.

- `once`: just observe event at a time, the default value is `false`.

**Example** 
```javascript
const pz = new Paparazzo();

pz.prependListener();

pz.on('marry', [(data) => {
    // you want to do
}, (data) => {
    // you want to do
}]);

// insert a handler into the queue handler of marry event
pz.prependListener('marry', (data) => {
    // this listener will be invoked when the marry event triggered
});
```

<a name='api-prependListener-2'></a>

#### prependListener(eventHandlersMap: IEventHandlersMap, once?: boolean): Paparazzo;

> add the listeners function to the beginning of the listeners array for the event named eventName

- `eventHandlersMap`: a hash object consisting of  event name and handlers, key is event name, value is handlers of handler

- `once`: just observe event at a time, the default value is `false`.

**Example** 
```javascript
const pz = new Paparazzo();

pz.on({
    eat: (data)=> {
        // do what you want to do
    },
    sleep: [(data)=> {     

    }, (data)=> {

    }]
});

// insert a handler into the queue handler of marry event
pz.prependListener({
    eat: (data)=> {
       // this listener will be invoked firstly when the eat event triggered
    },
    sleep: [(data)=> {     
        // this listener will be invoked firstly when the sleep event triggered
    }, (data)=> {
        // this listener will be  invoked secondly when the sleep event triggered
    }]
});
```

<a name='api-prependOnceListener-1'></a>

#### prependOnceListener(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;

> Adds a one-time listener function for the event named eventName to the beginning of the listeners array. The next time eventName is triggered, this listener is removed, and then invoked.

- `eventName`: the event you want to observe, if you want to observe more event at a time, what you need to do is  separate the event names with the style characters that you config.

- `handlers`: the function called when event was dispatched, it can be a function or an array of function,
 the parameter that handlers receives is send from Paparazzo.emit() method.

**Example** 
```javascript
const pz = new Paparazzo();

pz.prependOnceListener('eat', (data) => {
    // do what you want to do, I will be removed after invoked
});

pz.emit('eat');

// the listener has been removed, so there won't be any effect.
pz.emit('eat');
```

<a name='api-prependOnceListener-2'></a>

#### prependOnceListener(eventHandlersMap: IEventHandlersMap): Paparazzo;

> Adds  one-time listener functions for  events to the beginning of the listeners array. The next time event is triggered,  listeners are removed, and then invoked.

- `eventHandlersMap`: a hash object consisting of  event name and handlers, key is event name, value is handlers of handler

**Example** 
```javascript

const pz = new Paparazzo();

pz.on('eat', (data)=> {
    // do what you want to do
});

pz.on('sleep', (data)=> {
    // do what you want to do
});

// insert a handler into the queue handler of marry event
pz.prependOnceListener({
    eat: (data)=> {
       // this listener will be invoked firstly when the eat event triggered,and then invoked
    },
    sleep: [(data)=> {     
        // this listener will be invoked firstly when the sleep event triggered,and then invoked
    }, (data)=> {
        // this listener will be  invoked secondly when the sleep event triggered,and then invoked
    }]
});

```

<a name='api-once-1'></a>

#### once(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;
> Adds  one-time listener functions for events. The next time event is triggered, listeners are removed and then invoked

- `eventName`: the event you want to observe, if you want to observe more event at a time, what you need to do is  separate the event names with the style characters that you config.

- `handlers`: the function called when event was dispatched, it can be a function or an array of function,
 the parameter that handlers receives is send from Paparazzo.emit() method.

**Example** 
```javascript
const pz = new Paparazzo();

// observe three events by used the same listener
pz.once('pee eat sleep', (data) => {

});
// after trigger, the pee event's listener will be removed, the eat and sleep listeners still exist
pz.emit('pee');
// after trigger, the eat and sleep listeners will be removed
pz.emit('eat sleep');

```

<a name='api-once-2'></a>

#### once(eventHandlersMap: IEventHandlersMap): Paparazzo;
> Adds  one-time listener functions for events. The next time event is triggered, listeners are removed and then invoked

- `eventHandlersMap`: a hash object consisting of  event name and handlers, key is event name, value is handlers of handler 

**Example** 
```javascript
const pz = new Paparazzo();

pz.once({
    pee: () => {},
    sleep: [() => {}, () => {}]
});

pz.emit('sleep');

```

<a name='api-emit'></a>

#### emit(eventName: string, payload?: any): Paparazzo;
> Synchronously calls each of the listeners registered for events

- `eventName`: the event you want to observe, if you want to observe more event at a time, what you need to do is  separate the event names with the style characters that you config.

- `payload`: the data will be passed into the listener’s callback function.

**Example** 
```javascript
const pz = new Paparazzo();

pz.on('eat', () => {

});

pz.on('sleep', () => {

});

// trigger one event
pz.emit('eat');

// trigger multiple events at the same time
pz.emit('sleep eat', {});
```

<a name='api-off'></a>

#### off(eventName: string, handler?: EventHandler[] | EventHandler): Paparazzo;
> Removes the specified listener from the listener array for events

- `eventName`: the event you want remove listener, if you want to remove more event at a time, what you need to do is  separate the event names with the style characters that you config.

- `handlers`: the function called when event was dispatched, it can be a function or an array of function,
 the parameter that handlers receives is send from Paparazzo.emit() method.

**Example** 
```javascript
const pz = new Paparazzo();

const doSomething = () => {

};
pz.on('eat', [() => {

}, () => {

}]);
// remove event specified listener 
pz.off('eat', doSomething);

// without `handler` paramter, it will remove all listeners of eat event
pz.off('eat')
```

<a name='api-eventNames'></a>

#### eventNames(): string[];
> Returns an array listing the events for which the emitter has registered listeners

**Example** 
```javascript
pz.eventNames('eat'); 
```

<a name='api-listeners'></a>

#### listeners(eventName: string): EventHandler[];
> Returns a copy of the array of listeners for the event named eventName

- `eventName`: event name

**Example** 
```javascript
pz.listeners('sleep');
```