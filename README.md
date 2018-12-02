# paparazzo

## Synopsis
> Paparazzo is a simple, elegant and powerful event module that helps you quickly observe specific events, just like a paparazzi tracking celebrities.
The code is written using the TypeScript approaches.But it have been converted into UMD module and ES5 formate code that can run in nodejs and browser.The most API style likes the Nodejs's Event module.If you are very skilled at Nodejs's Event module, you can get started quickly. 
---------------------------------------------------------------
## Dependencies
There are no dependencies. You need only npm installed and just run npm install to grab the development dependencies.All you need to do is run this command:
```bash
npm install --save hk-paparazzo
``` 
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

### CMD

```javascript 
const Paparazzo = require("hk-paparazzo").Paparazzo;
const pz = new Paparazzo();
```

### AMD
```javascript
require(['myProject/lib/paparazzo.js'/*'the path you config for paparazzo'*/], function(hkPaparazzo) {

const Paparazzo = hkPaparazzo.Paparazzo;
const pz = new Paparazzo();
})
```

### ES Module

```javascript
import Paparazzo from 'hk-paparazzo';
const pz = new Paparazzo();
```


## Features & Usage


## API

-----------------------------------------------
### on(eventName, handlers, [once], [prepend])

### on(eventHandlersMap, [once], [prepend])

### once(eventName, handlers)

### once(eventHandlersMap)

### emmiter(eventName, [payload]);

### off(eventName, [handlers]);

### prependListener(eventName, handlers, [once])

### prependListener(eventHandlersMap, [once])

### prependOnceListener(eventName, handlers)

### prependOnceListener(eventHandlersMap)

### eventNames()

### listeners(eventName)

