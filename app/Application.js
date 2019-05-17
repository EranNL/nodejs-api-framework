const Server = require("./http/server/Server");

const express = require('express');
const Router = require('./routing/Router');

class Application {

    /**
     * @type {Application}
     */
    static instance;

    /**
     * @type {Server}
     */
    static server;

    /**
     * @type {express}
     */
    express;

    /**
     * @type {Router}
     */
    router;

    constructor() {
        this.express = express();
        this.router = new Router(this.express);
        Application.server = Server.getInstance();

        this.loadRoutes();
    }

    /**
     * Singleton instance of Application
     *
     * @returns {Application}
     */
    static getInstance() {
        if (!Application.instance) {
            Application.instance = new Application();
        }

        return Application.instance;
    }

    /**
     * Loads all routes in the express app
     *
     * @returns {void}
     */
    loadRoutes() {
        this.router.loadRoutes();
    }

    /**
     * Serve the application
     *
     * @returns {void}
     */
    serve() {
        Application.getServer().create(this.express).serve(3000);
    }

    /**
     * Returns the server
     *
     * @returns {Server}
     */
    static getServer() {
        return Application.server;
    }
}

module.exports = Application;