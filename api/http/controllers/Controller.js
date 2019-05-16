class Controller {

    request;

    response;

    setRequest(request) {
        this.request = request;

        return this;
    }

    setResponse(response) {
        this.response = response;

        return this;
    }

}

module.exports = Controller;