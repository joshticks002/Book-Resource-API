"use strict";
const Joi = require('joi');
const fs = require('fs');
function newInput() {
    const schema = Joi.object({
        "Title": Joi.string().min(2).required(),
        "Author": Joi.string().required(),
        "Description": Joi.string().required(),
        "pageCount": Joi.number().integer().required(),
        "Genre": Joi.string().min(5).required(),
        "Publisher": Joi.string().required(),
    });
    return schema;
}
function newUser() {
    const schema = Joi.object({
        "name": Joi.string().required(),
        "email": Joi.string().min(10).required().email(),
        "password": Joi.string().min(6).required(),
        "confirmPassword": Joi.string().min(6).required().valid(Joi.ref('password'))
    });
    return schema;
}
function userLogin() {
    const schema = Joi.object({
        "email": Joi.string().required().email(),
        "password": Joi.string().required(),
    });
    return schema;
}
function writeToFile(dir, content) {
    const writer = fs.createWriteStream(dir);
    writer.write(JSON.stringify(content, null, 2));
}
function checkDatabase() {
    try {
        fs.readFileSync('./database.json');
        fs.readFileSync('./users.json');
    }
    catch (err) {
        fs.writeFileSync('./database.json', JSON.stringify([], null, 2));
        fs.writeFileSync('./users.json', JSON.stringify([], null, 2));
    }
}
module.exports = {
    newInput,
    writeToFile,
    checkDatabase,
    newUser,
    userLogin
};
