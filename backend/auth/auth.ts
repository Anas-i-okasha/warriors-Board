import { ErrorRequestHandler, RequestHandler } from "express";

const requestHandler: RequestHandler = (req, res, next) => {
    console.log(`New Request--> Path: ${req.path} ------- Body: ${JSON.stringify(req.body)}`);
    next();
}

const customError: ErrorRequestHandler = (err, req, res, next) => {
    console.log('uncaught excepetion', err);
    res.status(500).send(err);
}

export {requestHandler, customError};