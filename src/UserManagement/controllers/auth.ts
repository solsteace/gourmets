import { AppError, AppErr } from "@lib/Error/AppError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { AuthenticatedRequest } from "@middleware/AuthValidator.ts";
import { AuthService } from "@UserManagement/services/auth.ts";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export class AuthController {
    private static readonly _REGISTER_CRITERIA = z.object({
        countryId: z.number().int().positive().optional(),
        displayName: z.string(),
        username: z.string(),
        email: z.string(),
        password: z.string(),
    }) 
    private static readonly _LOGIN_CRITERIA = z.object({
        username: z.string(),
        password: z.string()
    })

    constructor(
        private readonly _authService: AuthService
    ) {}

    public async register(req: Request, res: Response, next: NextFunction) {
        const validator = new ZodValidator<
            z.infer<typeof AuthController._REGISTER_CRITERIA>
                >(AuthController._REGISTER_CRITERIA)

        const {data, error} = validator.validate({
            countryId: req.body.countryId
                            ? z.coerce.number().parse(req.body.countryId)
                            : undefined,
            displayName: req.body.displayName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password 
        })

        if(error) {
            const errMsg = validator.getErrMessage(error)
            next(new AppError(AppErr.ValidationError, `${errMsg}`, error))
            return
        }
        
        const {username, displayName, password, email, countryId} = data
        await this._authService
            .register(username, displayName, password, email, countryId)
            .then(token => {
                res.send({
                    message: "Register success. You can now login to your account.",
                    authentication: token})
            })
            .catch(err => next(err))
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const validator = new ZodValidator<
            z.infer<typeof AuthController._LOGIN_CRITERIA>
                >(AuthController._LOGIN_CRITERIA)

        const {data, error} = validator.validate({ 
            username: req.body.username, 
            password: req.body.password 
        })

        if(error) {
            const errMsg = validator.getErrMessage(error)
            next(new AppError(AppErr.ValidationError, `${errMsg}`, error))
            return
        }

        await this._authService
            .login(data.username, data.password)
            .then(token => {
                res.send({
                    message: "Login success. Please use the following token to continue further",
                    authentication: token})
            })
            .catch(err => next(err))
    }

    async changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        // Requires: Old password authentication
    }
}
