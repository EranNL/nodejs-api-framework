const express = require('express');
const Router = require('./routing/Router');

class Application {

    express;

    router;

    constructor() {
        this.express = express();
        this.router = new Router(this.express);

        this.loadRoutes();
    }

    loadRoutes() {
        this.router.loadRoutes();
    }

    serve() {
        this.express.listen(3000, () => {
            console.log(`Listening on 3000`);
        })
    }

    /**
     *
     * @returns {Application}
     */
    static getInstance() {
        if (!Application.instance) {
            Application.instance = new Application();
        }

        return Application.instance;
    }
}

Application.instance = null;

module.exports = Application;