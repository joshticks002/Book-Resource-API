import { NextFunction, Request, Response } from "express";
var express = require('express');
var router = express.Router();
const { newInput, updateInput, checkDatabase } = require('../utils')
checkDatabase()
const { getBooks, getBookById, getBooksByGenre, addNewBook, updateBook, deleteBookData } = require('../controllers/bookController')
const validator = require('express-joi-validation').createValidator({})
const { protect } = require('../middleware/auth')

router.get('/add-new-book', protect, (req: Request, res: Response, next: NextFunction) => {
  res.render('create', { 
      title: 'New Book',
      "token": req.cookies.Token
  })
  next()
})

router.get('/', getBooks)

router.route('/:id').get(protect, getBookById).delete(protect, deleteBookData)

router.get('/:genre', protect, getBooksByGenre)

router.post('/', validator.body(newInput()), protect, addNewBook)

router.put('/update/:id', validator.body(updateInput()), protect, (req: Request, res: Response) => {
    updateBook(req, res, req.params.id)
})

/* GET home page. */
router.get('/home', function(req: Request, res: Response, next: NextFunction) {
  res.render('login', { title: 'Book Resource', "token": req.cookies.Token });
});

module.exports = router;
