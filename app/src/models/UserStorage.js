"use strict"

class UserStorage {
    static #users = {
        id: ["123", "이동훈", "dlehdgns"],
        psword: ["123", "1234", "321"],
        name: ["123", "이동훈", "이동삼"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;