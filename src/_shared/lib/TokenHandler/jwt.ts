import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenHandler } from "./TokenHandler.ts"
import { gEnv } from "@env";

const tokenLifetime = gEnv.DEV_ON? 120: gEnv.TOKEN_LIFETIME
const tokenSecret = gEnv.TOKEN_SECRET
const tokenConfig = { expiresIn: tokenLifetime*60}

export class Jwt implements TokenHandler {
    public encode<T extends jwt.JwtPayload>(payload: T): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload, 
                tokenSecret, 
                tokenConfig,
                (err, token) => {
                    if(token === undefined) {
                        reject(err)
                        return
                    }
                    resolve(token)
                })
        })
    }

    public decode<T extends jwt.JwtPayload>(token: string): Promise<T> {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                tokenSecret,
                (err, payload) => err? reject(err): resolve(payload! as T))
        })
    }
}