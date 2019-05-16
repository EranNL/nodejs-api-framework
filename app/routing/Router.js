const fs = require('fs');
const path = require('path');
const Request = require('../http/Request');
const Response = require('../http/Response');

class Router {

    /**
     * Express instance
     * @private
     */
    #express;

    constructor(express) {
        this.#express = express;
    }

    /**
     * Loads all routes
     * @returns {void}
     */
    loadRoutes() {
        //load routes
        //bind method to routes

        fs.readdirSync(`${appRoot}/api/routes/`).forEach(file => {
            require(`${appRoot}/api/routes/${file}`)(this.getRoutingContext());
        });

    }

    /**
     * Routing context
     * @returns {Object}
     */
    getRoutingContext() {
        return {
            get: this.get.bind(this),
            post: this.post.bind(this),
            put: this.put.bind(this),
            delete: this.delete.bind(this)
        }
    }

    /**
     * Generic request handler
     * @param {String} requestMethod
     * @param {String} path
     * @param {Object} config
     *
     * @returns {http.ServerResponse}
     *
     * @private
     * @since 1.0.0
     */
    #request = (requestMethod, path, config) => {
        const action = config.action.split('.');
        const controller = action[0];
        const method = action[1];

        //parse params

        const Controller = require(`${appRoot}/api/http/controllers/${controller}`);

        this.#express[requestMethod.toLowerCase()](path, (req, res) => {
            const controllerInstance = new Controller();

            //use setters to avoid mandatory super call in constructor
            controllerInstance
                .setRequest(new Request(req))
                .setResponse(new Response(res));

            return controllerInstance[method](...Object.values(req.params));
        });
    }

    get(path, config) {
        this.#request('get', path, config);
    }

    post(path, config) {
        this.#request('post', path, config);
    }

    put(path, config) {
        this.#request('put', path, config);
    }

    delete(path, config) {
        this.#request('delete', path, config);
    }

}

module.exports = Router;