"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let database = require('../../database.json');
const { writeToFile } = require('../utils');
function allBooks() {
    return new Promise((resolve, reject) => {
        resolve(database);
    });
}
function generateId() {
    if (database.length === 0) {
        return 1;
    }
    else {
        const newId = database[database.length - 1].bookId + 1;
        return newId;
    }
}
function bookById(idStr) {
    return new Promise((resolve, reject) => {
        const id = parseInt(idStr);
        if (id > database[database.length - 1].bookId) {
            reject(`Book with id ${id} not found`);
        }
        else {
            const theBook = database.find((Book) => Book.bookId === id);
            resolve(theBook);
        }
    });
}
function bookByGenre(genre) {
    return new Promise((resolve, reject) => {
        const theBooks = database.filter((book) => book.Genre.includes(genre));
        if (theBooks.length === 0) {
            reject(`Book(s) with genre ${genre} not found`);
        }
        else {
            resolve(theBooks);
        }
    });
}
function addNew(data) {
    return new Promise((resolve, reject) => {
        const newBook = { ...data };
        database.push(newBook);
        writeToFile('./database.json', database);
        resolve(newBook);
    });
}
function update(id, data) {
    return new Promise((resolve, reject) => {
        const dataIndex = database.findIndex((book) => book.bookId === id);
        database[dataIndex] = { ...data };
        writeToFile('./database.json', database);
        resolve(database[dataIndex]);
    });
}
function deleteBook(id) {
    return new Promise((resolve, reject) => {
        database = database.filter((book) => book.bookId !== id);
        writeToFile('./database.json', database);
        resolve(database);
    });
}
module.exports = {
    allBooks,
    bookById,
    bookByGenre,
    addNew,
    generateId,
    update,
    deleteBook
};
