
class Repository {

    /**
     * Returns the model of the repository
     *
     * @abstract
     */
    getModel() {
        throw new Error('You have to implement the method getModel!');
    }

    async all(columns = ['*']) {
        let all = [];

        try {
            const { results, fields }  = await application.getConnection().query(`SELECT ${columns.join(', ')} FROM users`);

            for (let i = 0; i < results.length; i++) {
                all.push(this.getModel().create(results[i]));
            }
        }
        catch (e) {
            console.error(e);
        }

        return all;
    }

    async find(id, columns = ['*']) {
        let obj = null;

        try {
            const { results, fields }  = await application.getConnection().query(
                `SELECT ${columns.join(', ')} FROM users WHERE id = ?`,
                [id]
            );

            if(results.length) {
                obj = this.getModel().create(results[0]);
            }
        }
        catch (e) {
            console.error(e);
        }

        return obj;
    }

}

module.exports = Repository;