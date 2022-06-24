import { Request, Response } from "express";
const Model = require('../models/bookModel')

interface Update { 
    Title: string; 
    Author: string; 
    Description: string; 
    pageCount: number; 
    Genre: string; 
    Publisher: string; 
}

const getBooks = async(req: Request, res: Response) => {
    const books = await Model.allBooks()
    res.render('index',{ title: "Book Library", 
                        books, 
                        "token": req.cookies.Token,
                        "uid": req.cookies.Uid,
                        "user": req.cookies.Username})
}

const getBookById = async(req: Request, res: Response) => {
    try{
        const books = await Model.bookById(req.params.id)
        res.render('bookinfo', { title: "Books", books: [books], 
                                "token": req.cookies.Token,
                                "uid": req.cookies.Uid,
                                "user": req.cookies.Username})
    } catch(error) {
        res.render('404', {title: "Books", message: error, 
                                            "token": req.cookies.Token,
                                            "uid": req.cookies.Uid,
                                            "user": req.cookies.Username})
    }
}

const getBooksByGenre = async(req: Request, res: Response) => {
    try{
        const specBooks = await Model.bookByGenre(req.params.genre)
        res.render('index',{ title: "Books", books: [specBooks]})
    } catch(error) {
        res.render('404', {title: "Books", message: error})
    }
}

const addNewBook = async(req: Request, res: Response) => {
    try{
        const body: Update = req.body
        const input = {
            "Uid": req.cookies.Uid,
            "Title": body.Title,
            "Author": body.Author,
            "datePublished": new Date(),
            "Description": body.Description,
            "pageCount": body.pageCount,
            "Genre": body.Genre,
            "bookId": Model.generateId(),
            "Publisher": body.Publisher,
        }
    
        const book = await Model.addNew(input)
        res.render('index', { title: "New Book", books: [book], 
                                "token": req.cookies.Token,
                                "uid": req.cookies.Uid,
                                "user": req.cookies.Username})
    } catch(error) {
        res.render('404', {title: "Books", 
        message: error, 
        "token": req.cookies.Token,
        "uid": req.cookies.Uid,
        "user": req.cookies.Username})
    }  
}


const updateBook = async(req: Request, res: Response, idStr: string) => {
    const body: Update = req.body
    const id = Number(idStr)
    try{
        const theBook = await Model.bookById(id)

        if (req.cookies.Uid !== theBook.Uid || !theBook.Uid) {
            res.status(400);
            throw new Error('You have no access to this book!');
        }
        
        const input = {
            "Uid": theBook.Uid,
            "Title": body.Title || theBook.Title,
            "Author": body.Author || theBook.Author,
            "datePublished": theBook.datePublished,
            "Description": body.Description || theBook.Description,
            "pageCount": body.pageCount || theBook.pageCount,
            "Genre": body.Genre || theBook.Genre,
            "bookId": theBook.bookId,
            "Publisher": body.Publisher || theBook.Publisher,
        }

        const book = await Model.update(id, input)
        res.render('index',{ title: "Updated Book", 
                            books: [book], 
                            "token": req.cookies.Token,
                            "uid": req.cookies.Uid,
                            "user": req.cookies.Username})
    } catch(error) {
        res.render('404', {title: "Books", 
                            message: error, 
                            "token": req.cookies.Token,
                            "uid": req.cookies.Uid,
                            "user": req.cookies.Username})
    }  
}

const  deleteBookData = async(req: Request, res: Response) => {
    try{
        const id = Number(req.params.id)
        const theBook = await Model.bookById(id);

        if (req.cookies.Uid !== theBook.Uid || !theBook.Uid) {
            res.status(400);
            throw new Error('You have no access to this book!');
        }

        await Model.deleteBook(id);
        res.status(201).render('index', { 
                title: "Deleted", 
                books: [theBook], 
                message: `${theBook.Title} with id ${id} has been removed`, 
                "token": req.cookies.Token,
                "uid": req.cookies.Uid,
                "user": req.cookies.Username })
    } catch(error) {
        res.render('404', {title: "Books", 
                            message: error, 
                            "token": req.cookies.Token,
                            "uid": req.cookies.Uid,
                            "user": req.cookies.Username})
    }
}


module.exports = {
    getBooks,
    getBookById,
    getBooksByGenre,
    addNewBook,
    updateBook,
    deleteBookData
}