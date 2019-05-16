const Controller = require('./Controller');

class UserController extends Controller {

    index(world) {
        return this.response.send(`Hello ${world}`);
    }

}

module.exports = UserController;