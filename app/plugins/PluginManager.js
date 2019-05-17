const EventEmitter = require('events').EventEmitter;
const Application = require('../Application');
const fs = require('fs');

class PluginManager extends EventEmitter {

    /**
     * @type {Object}
     */
    static #plugins = {};

    constructor() {
        super();
    }

    /**
     * Load all plugins
     *
     * @returns {void}
     *
     * @todo make plugins dir configurable
     */
    async loadPlugins() {
        this.emit('before_load');

        await fs.readdirSync(`${appRoot}/api/plugins/`).forEach(file => {
            const plugin = require(`${appRoot}/api/plugins/${file}`);
            const pluginInstance = new plugin({application: application});

            this.#addPlugin(plugin.name, pluginInstance);
            this.emit('plugin_loaded', plugin);
        });

        this.emit('plugins_loaded', Object.keys(PluginManager.#plugins).length);
    }

    /**
     * Add plugin to loaded plugins
     *
     * @param {String} name
     * @param {Function} pluginFn
     * @returns {void}
     *
     * @private
     */
    #addPlugin = (name, pluginFn) => {
        PluginManager.#plugins[name] = pluginFn;
    }

    /**
     * Returns the list of loaded plugins
     *
     * @returns {Array}
     */
    static getPlugins() {
        return PluginManager.#plugins;
    }
}

module.exports = PluginManager;