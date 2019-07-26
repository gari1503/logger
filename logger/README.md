This package is used to get logs for both client and server side.
To use this package you need to add node: { fs: "empty" } in webpack.config.js.

#Install

$ npm install @gslogr/l

#Usage

 - Client side

```
import { sendLogs } from "@gslogr/l";


....
componentWillMount() {
    const nodeAPIUrl = "";
    sendLogs(nodeAPIUrl);
}
```

 - Server side

```
const logger = require("@gslogr/l");
logger.info("print info logs");
```
