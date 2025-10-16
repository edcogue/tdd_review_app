import { App } from "./app";

const PORT = parseInt(process.env.PORT || "3333", 10);

// Create and start the application
const appInstance = new App();
appInstance.listen(PORT);
