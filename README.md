### NodeJS API Framework

This is a project to study NodeJS working as a REST API.

#### Stack
 
 - NodeJS 12.2.0
 - Express 
 - Lodash
 - MySQL
 
 #### Core functionalities
 
 - Models
 - Controllers
 - Routing
 - Plugin system


### Tutorials

#### Routes
Add a file in api/routes.  
Examle of a route file:

_testRoutes.js_
```javascript
module.exports = function(router) {
    router.get('/test', {action: 'TestController.index'});
    router.get('/test/:id', {action: 'TestController.indexWithParam'});
};
```

These routes use the TestController, with both their own method. Controllers are located in _api/http/controllers_   
Let's create them.

#### Controllers

_TestController.js_

```javascript
const Controller = require('./Controller');

class TestController extends Controller {

    /**
     * @type {UserRepository}
     */
    userRepository;

    constructor() {
        super();
    }

    index() {
        return this.response.send('Test Index')
    }
    
    indexWithParam(id) {
        return this.response.send(`Test Index with param ${id}`)
    }

}

module.exports = TestController;
```

It is also possible to get i.e. a user with the given param:

#### Repositories

Repositories are located in _api/database/repositories/_

_UserRepository.js_

```javascript
const Repository = require('./Repository');
const User = require('../models/User');

class UserRepository extends Repository {

    getModel() {
        return new User();
    }

}

module.exports = UserRepository;
```

and as you can see, the repository requires the User model.

#### Models

_User.js_

Models are located in _api/database/models/_

```javascript
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
```

Models can be created as follows:
```javascript
const user = User.create({
    name: 'John',
    surname: 'Doe'
})
```

where the object sent to the `create` method matches the fields in your database. 

