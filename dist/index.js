"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = parseInt(process.env.PORT || "3000", 10);
// Create and start the application
const appInstance = new app_1.App();
appInstance.listen(PORT);
//# sourceMappingURL=index.js.map