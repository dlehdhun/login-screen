"use strict";

const { json } = require("stream/consumers");

const db = require("../config/db");

class UserStorage {
    static #getUserInfo(date, id) {
        const users = JSON.parse(date);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users);

        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static #getUsers(date, isAll, fields) {
        const users = JSON.parse(date);
        if (isAll) return users;

        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = UserStorage;