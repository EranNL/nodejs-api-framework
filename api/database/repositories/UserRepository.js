const Repository = require('./Repository');
const User = require('../models/User');

class UserRepository extends Repository {

    getModel() {
        return new User();
    }

}

module.exports = UserRepository;