import { AppError, AppErr } from "@lib/Error/AppError.ts";
import { TokenAuth, TokenHandler } from "src/_shared/lib/TokenHandler/TokenHandler.ts";
import { TokenParser } from "src/_shared/lib/TokenParser/TokenParser.ts";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: {id: number}
}

export class AuthValidator {
    constructor(
        private readonly handler: TokenHandler,
        private readonly parser: TokenParser
    ) {}

    public validate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const rawToken = req.headers.authorization
        if(rawToken === undefined) {
            next(new AppError(AppErr.Unauthorized, "Please log in to your account first"))
            return
        }

        const token = this.parser.parseToken(rawToken)
        this.handler
            .decode<TokenAuth>(token)
            .then(payload => {
                req.user = {id: payload.id}
                next()
            })
            .catch(err => {
                // Source (25/02/28): https://github.com/auth0/node-jsonwebtoken/issues/963
                if(err instanceof jwt.TokenExpiredError) { 
                    next(new AppError(AppErr.Unauthorized, "Your token has expired. Please log in again"))
                    return
                }
                next(err)
            })
    }
}