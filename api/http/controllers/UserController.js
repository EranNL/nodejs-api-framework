const Controller = require('./Controller');
const UserRepository = require('./../../database/repositories/UserRepository');

class UserController extends Controller {

    /**
     * @type {UserRepository}
     */
    userRepository;

    constructor() {
        super();

        this.userRepository = new UserRepository();
    }

    async index() {
        const user = await this.userRepository.find(1);

        return this.response.send(user.getName());
    }

}

module.exports = UserController;


