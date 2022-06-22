"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model = require('../models/bookModel');
const getBooks = async (req, res) => {
    const books = await Model.allBooks();
    res.render('index', { title: "Book Library", books, "token": req.cookies.Token });
};
const getBookById = async (req, res) => {
    try {
        const books = await Model.bookById(req.params.id);
        res.render('bookinfo', { title: "Books", books: [books] });
    }
    catch (error) {
        res.render('404', { title: "Books", message: error, "token": req.cookies.Token });
    }
};
const getBooksByGenre = async (req, res) => {
    try {
        const specBooks = await Model.bookByGenre(req.params.genre);
        res.render('index', { title: "Books", books: [specBooks] });
    }
    catch (error) {
        res.render('404', { title: "Books", message: error });
    }
};
const addNewBook = async (req, res) => {
    try {
        const input = {
            "Title": req.Title,
            "Author": req.Author,
            "datePublished": new Date(),
            "Description": req.Description,
            "pageCount": req.pageCount,
            "Genre": req.Genre,
            "bookId": Model.generateId(),
            "Publisher": req.Publisher,
        };
        const book = await Model.addNew(input);
        res.render('index', { title: "New Book", books: [book] });
    }
    catch (error) {
        res.render('404', { title: "Books", message: error });
    }
};
const updateBook = async (req, res, idStr) => {
    const id = Number(idStr);
    try {
        const theBook = await Model.bookById(id);
        const input = {
            "Title": req.Title || theBook.Title,
            "Author": req.Author || theBook.Author,
            "datePublished": theBook.datePublished,
            "Description": req.Description || theBook.Description,
            "pageCount": req.pageCount || theBook.pageCount,
            "Genre": req.Genre || theBook.Genre,
            "bookId": theBook.bookId,
            "Publisher": req.Publisher || theBook.Publisher,
        };
        const book = await Model.update(id, input);
        res.render('index', { title: "Updated Book", books: [book] });
    }
    catch (error) {
        res.render('404', { title: "Books", message: error });
    }
};
const deleteBookData = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const theBook = await Model.bookById(id);
        await Model.deleteBook(id);
        res.status(201).render('index', {
            title: "Deleted",
            books: [theBook],
            message: `${theBook.Title} with id ${id} has been removed`
        });
    }
    catch (error) {
        res.render('404', { title: "Books", message: error });
    }
};
module.exports = {
    getBooks,
    getBookById,
    getBooksByGenre,
    addNewBook,
    updateBook,
    deleteBookData
};
