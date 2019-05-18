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
        try {
            this.sqlServer = mysql.createConnection({
                host     : application.config.get('database.host'),
                user     : application.config.get('database.user'),
                password : application.config.get('database.password'),
                database : application.config.get('database.database')
            });
        }
        catch (e) {

        }

        return this.sqlServer;
    }

    getConnection() {
        return this;
    }

    performQuery(sql) {
        const promise = new Promise((resolve, reject) => {
            this.sqlServer.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve({results, fields});
                }
            });
        });

        return promise;
    }
}

module.exports = DatabaseManager;