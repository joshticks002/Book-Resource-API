import { NextFunction, Request, Response } from "express";
var express = require('express');
var router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/userController')
const validator = require('express-joi-validation').createValidator({})
const { newUser, userLogin } = require('../utils')

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
  res.render('login', { 
      title: 'Login Page', 
      "token": req.cookies.Token,
      "uid": req.cookies.Uid,
      "user": req.cookies.Username
  })
  next()
})

router.get('/register', (req: Request, res: Response, next: NextFunction) => {
  res.render('register', { 
      title: 'Registration Page', 
      "token": req.cookies.Token,
      "uid": req.cookies.Uid,
      "user": req.cookies.Username
  })
  next()
})

router.post('/register', validator.body(newUser()), registerUser)
router.post('/login', validator.body(userLogin()), loginUser)
router.get('/logout', logoutUser)

/* GET users listing. */
// router.get('/', function(req: Request, res: Response, next: NextFunction) {
//   res.render('index', {title: 'Book Resource'});
// });

module.exports = router;
