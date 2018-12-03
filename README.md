# paparazzo

## Synopsis
> Paparazzo is a simple, elegant and powerful event module that helps you quickly observe specific events, just like a paparazzi tracking celebrities.The code is written using the TypeScript approaches.But it have been converted into UMD module and ES5 formate code that can run in nodejs and browser.The most API style likes the Nodejs's Event module.If you are very skilled at Nodejs's Event module, you can get started quickly. 

---------------------------------------------------------------

## Dependencies
There are no dependencies. You need only npm installed and just run npm install to grab the development dependencies.All you need to do is run this command:

```bash
npm install --save hk-paparazzo
``` 

---------------------------------------------------------------

## How to use
### Direct `<script>` Include

You can download the production release from `https://github.com/RIO-LI/paparazzo/releases/download/0.06/paparazzo.js`.
You can download the development release from `https://github.com/RIO-LI/paparazzo/releases/download/0.06/paparazzo.min.js`.

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

### CMD

```javascript 
const Paparazzo = require("hk-paparazzo").Paparazzo;
const pz = new Paparazzo();
```

----------------------------------------------------------

### AMD
```javascript
require(['myProject/lib/paparazzo.js'/*'the path you config for paparazzo'*/], function(hkPaparazzo) {

const Paparazzo = hkPaparazzo.Paparazzo;
const pz = new Paparazzo();
})
```

-------------------------------------------------------------

### ES Module

```javascript
import Paparazzo from 'hk-paparazzo';
const pz = new Paparazzo();
```

-------------------------------------------------------------

## Features & Usage

-------------------------------------------------------------

```javascript

const Paparazzo = require("hk-paparazzo").Paparazzo;
const pz = new Paparazzo();

// observe `marry` event, and one handler
pz.on('marry', (data) => {
    // you want to da
});

// continue to  observe `marry` event, and  handlers
pz.on('marry', [(data) => {
    // you want to da
}, (data) => {
    // you want to da
}])

// observe `gossip` and `affair` simultaneously,and add handlers
pz.on('gossip affair', [(data) => {
    // the parameter that handler receives is send from Paparazzo.emmiter() method
    console.log(`if you dispatch gossip or affair event, this function will be called`);
},(data) => {
    console.log(`if you dispatch gossip or affair event, this function will be called`);
}]);

// dispatch multiple events, and send data
pz.emmiter('gossip affair', {name: 'XXX'});

// observe a event at a time，after the event has dispatched, the event will be remove from the observe event list
pz.once('sleep', (data) => {
    console.log(`${data} is already asleep`);
});

pz.emmiter('sleep', {name: 'XXX'});

// give up watching an event
pz.off('marry');

// give up watching some events
pz.off('gossip affair');

```

-------------------------------------------------------------

## Type & Interface
--------------------------------------------
> the paparazzo was written by typescript,the static type or interface and help you to understand what params the method want and what will be return from the method

```typescript
// the type of event handler
type EventHandler = (payload?: any) => void;

interface IEventsMap {
    [propName: string]: IEventMapItem[];
}

interface IEventMapItem {
    handler?: EventHandler;
    originHandler?: EventHandler;
    [propName: string]: any;
}

interface IConfig {
    separator?: string;
    [propName: string]: any;
}
```

## API

-----------------------------------------------
#### constructor(config:IConfig)

#### on(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean, prepend?: boolean): Paparazzo;

#### on(eventHandlersMap: IEventsMap, once?: boolean, prepend?: boolean): Paparazzo;

#### prependListener(eventName: string, handlers: EventHandler[] | EventHandler, once?: boolean): Paparazzo;

#### prependListener(eventHandlersMap: IEventsMap, once?: boolean): Paparazzo;

#### prependOnceListener(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;
    
#### prependOnceListener(eventHandlersMap: IEventsMap): Paparazzo;

#### once(eventName: string, handlers: EventHandler[] | EventHandler): Paparazzo;

#### once(eventHandlersMap: IEventsMap): Paparazzo;

#### emmiter(eventName: string, payload?: any): Paparazzo;

#### off(eventName: string, handler?: EventHandler[] | EventHandler): Paparazzo;

#### eventNames(): string[];

#### listeners(eventName: string): EventHandler[];

#### listeners(eventName)

