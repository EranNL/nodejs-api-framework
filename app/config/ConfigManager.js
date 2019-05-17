const EventEmitter = require('events').EventEmitter;
const path = require('path');
const fs = require('fs');

class ConfigManager extends EventEmitter {

    /**
     * @type {Object}
     */
    config = {};

    constructor() {
        super();

        this.loadConfigs();
    }

    /**
     * Load all config files into one config
     *
     * @returns {void}
     */
    loadConfigs() {
        fs.readdirSync(`${appRoot}/api/config/`).forEach(file => {
            const configPart = require(`${appRoot}/api/config/${file}`);

            this.#addConfigPart(file, configPart);
        });
    }

    /**
     * Add a config part to the main config
     *
     * @param {String} part
     * @param {Object|String} partConfig
     */
    #addConfigPart = (part, partConfig) => {
        this.config[part] = partConfig;
    }

    /**
     * Get a value from the config
     *
     * @param {String|array} path
     * @param {*} defaultValue
     * @returns {*}
     */
    get(path, defaultValue) {
        return _.get(this.config, path, defaultValue);
    }
}

module.exports = ConfigManager;