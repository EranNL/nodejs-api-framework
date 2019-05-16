module.exports = function(router) {
    router.get('/', {action: 'UserController.index'});
};