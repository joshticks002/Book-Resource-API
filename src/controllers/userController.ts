const Model = require('../models/userModel')
import { Request, Response } from "express";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const generateToken = (id: number) => {
    return jwt.sign({ id }, '123456abc', {
      expiresIn: '3d',
    })
}


const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body
  
    // Check if user exists
    const userExists = await Model.findExistingUser(email)
  
    if (userExists !== 'false') {
      res.status(400)
      throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await Model.createUser({
      name,
      email,
      password: hashedPassword,
    })

    // register user
    if (user) {
      const mytoken = generateToken(user.id)
      res.cookie('Token', mytoken)
      
      res.status(201).redirect('/api/books')
    }
})

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await Model.findUser(email)
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const mytoken = generateToken(user.id)
      res.cookie('Token', mytoken)
      
      res.redirect('/api/books')
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
})

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie('Token', '')
    req.cookies.Token = ''
    res.redirect('/api/users/login')
})
  


module.exports = {
    registerUser,
    loginUser,
    logoutUser
}