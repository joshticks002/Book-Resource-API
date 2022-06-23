import fs from 'fs'
let database = require('../../users.json')
const { v4: uuidv4 } = require('uuid');
const { writeToFile } = require('../utils')


function generateId() {
    if (database.length === 0) {
        return 1
    } else {
        const newId = database[database.length - 1].id + 1
        return newId
    }
}

function findExistingUser(email: string) {
    return new Promise((resolve, reject) => {
        const user = database.find((user: { email: string }) => user.email === email)
        if (user) {
            resolve(true)
        } else (
            resolve('false')
        )
    })
}

function findUser(email: string) {
    return new Promise((resolve, reject) => {
        const user = database.find((user: { email: string }) => user.email === email)
        resolve(user)
    })
}

function findUserById(id: number) {
    return new Promise((resolve, reject) => {
        const user = database.find((user: { id: number }) => user.id === id)
        resolve(user)
    })
}

function createUser(data: object) {
    return new Promise((resolve, reject) => {
        const newUser = {id: generateId(), uid: uuidv4(), ...data}
        database.push(newUser)
        writeToFile('./users.json', database)
        resolve(newUser)
    })
}


module.exports = {
    findExistingUser,
    findUser,
    createUser,
    findUserById
}