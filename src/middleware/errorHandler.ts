import { NextFunction, Request, Response } from "express";
import { HttpError } from 'http-errors'

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode).render('404', { title: 'Error', message: err.message })
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}