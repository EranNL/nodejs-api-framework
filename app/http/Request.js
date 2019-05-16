
class Request {

    /**
     * @type {http.clientRequest?}
     */
    req;

    /**
     * @param {http.clientRequest?} req
     */
    constructor(req) {
        this.req = req;
    }
}

module.exports = Request;