import fs from 'fs';
let database = require('../../database.json')
const { writeToFile } = require('../utils');

function allBooks() {
    return new Promise((resolve, reject) => {
        resolve(database)
    })
}

function generateId() {
    if (database.length === 0) {
        return 1
    } else {
        const newId = database[database.length - 1].bookId + 1
        return newId
    }
}

function bookById(idStr: string) {
    return new Promise((resolve, reject) => {
        const id = parseInt(idStr)
        if (id > database[database.length - 1].bookId) {
            reject(`Book with id ${id} not found`)
        } else {
            const theBook = database.find((Book: { bookId: number; }) => Book.bookId === id)
            resolve(theBook)
        }
    })
}

function bookByGenre(genre: string) {
    return new Promise((resolve, reject) => {
        const theBooks = database.filter((book: { Genre: string; }) => book.Genre.includes(genre))
        if (theBooks.length === 0) {
            reject(`Book(s) with genre ${genre} not found`)
        } else {
            resolve(theBooks)
        }
    })
}

function addNew(data: object) {
    return new Promise((resolve, reject) => {
        const newBook = {...data}
        database.push(newBook)
        writeToFile('./database.json', database)
        resolve(newBook)
    })
}

function update(id: number, data: object) {
    return new Promise((resolve, reject) => {
        const dataIndex = database.findIndex((book: { bookId: number; }) => book.bookId === id)
        database[dataIndex] = {...data}
        writeToFile('./database.json', database)
        resolve(database[dataIndex])
    })
}

function deleteBook(id: number) {
    return new Promise((resolve, reject) => {
        database = database.filter((book: { bookId: number; }) => book.bookId !== id)
        writeToFile('./database.json', database)
        resolve(database)
    })
}

module.exports = {
    allBooks,
    bookById,
    bookByGenre,
    addNew,
    generateId,
    update,
    deleteBook
}