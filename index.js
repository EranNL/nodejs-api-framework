const path = require('path');
const Application = require("./app/Application");

global.appRoot = path.join(__dirname);

global.application = Application.getInstance();
Application.getPluginManager().loadPlugins();
application.serve();