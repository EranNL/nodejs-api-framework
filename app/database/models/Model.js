const moment = require('moment');

class Model {

    #hiddenProperties = ['password'];

    #dateProperties = ['created_at', 'updated_at'];

    create(data) {
        for(let property in data) {
            if(data.hasOwnProperty(property)) {
                this.#addDataToInstance(property, data[property]);
            }
        }

        return this;
    }

    #addDataToInstance = (property, value) => {
        const hiddenProperties = this.hiddenProperties || this.#hiddenProperties;
        const dateProperties = this.dateProperties || this.#dateProperties;

        if(hiddenProperties.indexOf(property) !== -1) {
            return;
        }

        if(dateProperties.indexOf(property) !== -1) {
            value = moment(value);
        }

        this[property] = value;
    }
}

module.exports = Model;