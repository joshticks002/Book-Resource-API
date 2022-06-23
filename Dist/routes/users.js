"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const validator = require('express-joi-validation').createValidator({});
const { newUser, userLogin } = require('../utils');
router.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'Login Page',
        "token": req.cookies.Token
    });
    next();
});
router.get('/register', (req, res, next) => {
    res.render('register', {
        title: 'Registration Page',
        "token": req.cookies.Token
    });
    next();
});
router.post('/register', validator.body(newUser()), registerUser);
router.post('/login', validator.body(userLogin()), loginUser);
router.get('/logout', logoutUser);
/* GET users listing. */
// router.get('/', function(req: Request, res: Response, next: NextFunction) {
//   res.render('index', {title: 'Book Resource'});
// });
module.exports = router;
