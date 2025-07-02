"use strict";

const { json } = require("stream/consumers");

const fs = require("fs").promises;

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

    static getUsers(isAll, ...fields) {
        return fs
            .readFile("./src/databases/users.json")
            .then((date) => {
                return this.#getUsers(date, isAll, fields);
            })
            .catch(console.error);
    }

    static getUserInfo(id) {
        return fs
            .readFile("./src/databases/users.json")
            .then((date) => {
                return this.#getUserInfo(date, id);
            })
            .catch(console.error);
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);
        if (users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        // 데이터 추가
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return {success : true};
    }
}

module.exports = UserStorage;