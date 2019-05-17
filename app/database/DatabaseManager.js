const mysql = require('mysql');
const EventEmitter = require('events').EventEmitter;
const Application = require('../../app/Application');

class DatabaseManager extends EventEmitter {

    constructor() {
        super();

        this.init();
    }

    sqlServer;

    init() {
        this.sqlServer = mysql.createConnection({
            host     : application.config.get('database.host'),
            user     : application.config.get('database.user'),
            password : application.config.get('database.password'),
            database : application.config.get('database.database')
        });

        try {
            this.sqlServer.connect(err => {
                // console.log(err);
            });
        }
        catch (e) {

        }

        return this.sqlServer;
    }

    getConnection() {
        return this.sqlServer;
    }

}

module.exports = DatabaseManager;