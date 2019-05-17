const http = require('http');

class Server {

    static instance;

    app;

    server;

    static getInstance() {
        if (!Server.instance) {
            Server.instance = new Server();
        }

        return Server.instance;
    }



    create(app) {
        if(!this.server) {
            this.server = http.createServer(app);
        }

        return this;
    }

    serve(port) {
        try {
            this.server.listen(port, () => {
                console.log(`Listening on ${port}`);
            });
        }
        catch (e) {
            console.log("Server already running");
        }
    }
}

module.exports = Server;