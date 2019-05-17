const Server = require("./http/server/Server");
const express = require('express');
const Router = require('./routing/Router');
const PluginManager = require('./plugins/PluginManager');
const ConfigManager = require('./config/ConfigManager');

class Application {

    /**
     * @type {Application}
     */
    static instance;

    /**
     * @type {Server}
     */
    server;

    /**
     * @type {express}
     */
    express;

    /**
     * @type {Router}
     */
    router;

    /**
     * @type {PluginManager}
     */
    pluginManager;

    /**
     * @type {ConfigManager}
     */
    config;

    constructor() {
        this.express = express();
        this.router = new Router(this.express);
        this.server = Server.getInstance();
        this.pluginManager = new PluginManager();
        this.config = new ConfigManager();

        this.init();
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
     * Initialize the application
     */
    init() {
        this.loadRoutes();

        this.getPluginManager().on('plugins_loaded', count => {
            console.log(`PluginManager: loaded ${count} plugins`);
        });

        return this;
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
        this.getServer().create(this.express).serve(3000);
    }

    /**
     * Returns the server
     *
     * @returns {Server}
     */
    getServer() {
        return this.server;
    }

    getPluginManager() {
        return this.pluginManager;
    }

}

module.exports = Application;