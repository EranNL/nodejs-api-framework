const path = require('path');
const Application = require("./app/Application");

global.appRoot = path.join(__dirname);

Application.getInstance().serve();