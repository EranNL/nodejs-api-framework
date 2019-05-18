const Model = require('../../../app/database/models/Model');

class User extends Model {

    constructor(data) {
        super();
    }

    getName() {
        return this.name
    }
}

module.exports = User;