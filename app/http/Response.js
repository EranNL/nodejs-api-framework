
class Response {

    /**
     * @type {http.ServerResponse}
     */
    res;

    constructor(res) {
        this.res = res;
    }

    /**
     * Send the response back to the user
     *
     * @param body
     */
    send(body) {
        this.res.send(body);
    }

}

module.exports = Response;