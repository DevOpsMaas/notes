import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Get JWT token from the request
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    // if token is not included in request; return unauthorized status 403
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    // verify if the token from the request is valid; return 401 if not
    try {
        jwt.verify(token, config.PRIVATE_KEY);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
}

module.exports = verifyToken;