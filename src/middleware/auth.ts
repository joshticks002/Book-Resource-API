import { NextFunction, Request, Response } from "express";
const Model = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.Token
  const JWT_SECRET = '123456abc'

  if (token) {
    try {
      // Verify token
      if (JWT_SECRET){
        const decoded = jwt.verify(token, JWT_SECRET);
        // Get user from the token
        if (decoded) {
            const user = await Model.findUserById(decoded.id);
            next();
        }
      }
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }

  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      if (JWT_SECRET){
        const decoded = jwt.verify(token, JWT_SECRET);
        // Get user from the token
        if (typeof(decoded) !== "string") {
            const user = await Model.findUserById(decoded.id);
        }
        next();
      }
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }