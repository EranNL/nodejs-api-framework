const EventEmitter = require('events').EventEmitter;
const Application = require('../Application');
const fs = require('fs');

class PluginManager extends EventEmitter {

    /**
     * @type {Array}
     */
    static plugins = [];

    /**
     * Load all plugins
     *
     * @returns {void}
     *
     * @todo make plugins dir configurable
     */
    loadPlugins() {
        this.emit('before_load');

        fs.readdirSync(`${appRoot}/api/plugins/`).forEach(file => {
            const plugin = require(`${appRoot}/api/plugins/${file}`)(Application.getInstance());
            this.#addPlugin(plugin.name, plugin);
            this.emit('plugin_loaded', plugin);
        });

        this.emit('plugins_loaded', PluginManager.plugins.length);
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
        PluginManager.plugins[name] = pluginFn;
    }
}

module.exports = PluginManager;