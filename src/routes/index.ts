import { NextFunction, Request, Response } from "express";
var express = require('express');
var router = express.Router();
const { newInput, updateInput, checkDatabase } = require('../utils')
checkDatabase()
const { getBooks, getBookById, getBooksByGenre, addNewBook, updateBook, deleteBookData } = require('../controllers/bookController')
const validator = require('express-joi-validation').createValidator({})
const { protect } = require('../middleware/auth')


router.get('/login', (req: Request, res: Response, next: NextFunction) => {
  res.render('login', { 
      title: 'Login Page'
  })
  next()
})

router.get('/register', (req: Request, res: Response, next: NextFunction) => {
  res.render('register', { 
      title: 'Registration Page'
  })
  next()
})

router.get('/add-new-book', protect, (req: Request, res: Response, next: NextFunction) => {
  res.render('create', { 
      title: 'New Book'
  })
  next(getBooks)
})

router.get('/', protect, getBooks)

router.route('/:id').get(protect, getBookById).delete(protect, deleteBookData)

router.get('/:genre', protect, getBooksByGenre)

router.post('/', validator.body(newInput()), protect, (req: Request, res: Response) => {
    addNewBook(req.body, res)
})

router.put('/:id', validator.body(updateInput()), protect, (req: Request, res: Response) => {
    updateBook(req.body, res, req.params.id)
})

/* GET home page. */
router.get('/home', function(req: Request, res: Response, next: NextFunction) {
  res.render('login', { title: 'Book Resource' });
});

module.exports = router;
