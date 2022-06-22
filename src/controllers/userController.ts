const Model = require('../models/userModel')
import { Request, Response } from "express";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const generateToken = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    })
}

let userToken = ''
const keeper = () => {
  const validToken = userToken 
  return validToken.trim()
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

    
    if (user) {
      const mytoken = generateToken(user.id)
      userToken = mytoken
      
      res.redirect('/api/books')
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: mytoken,
      })
    }
})

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await Model.findUser(email)
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const mytoken = generateToken(user.id)
      userToken = mytoken
      
      res.redirect('/api/books')
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: mytoken,
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
})
  


module.exports = {
    registerUser,
    loginUser,
    keeper
}