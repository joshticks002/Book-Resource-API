import { NextFunction, Request, Response } from "express";
var express = require('express');
var router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController')
const validator = require('express-joi-validation').createValidator({})
const { newUser, userLogin } = require('../utils')

router.post('/register', validator.body(newUser()), registerUser)
router.post('/login', validator.body(userLogin()), loginUser)

/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', {title: 'Book Resource'});
});

module.exports = router;
