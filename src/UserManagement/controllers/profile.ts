import { AppErr, AppError } from "@lib/Error/AppError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { AuthenticatedRequest } from "@middleware/AuthValidator.ts";
import { ProfileService } from "@UserManagement/services/profile.ts";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export class ProfileController {
    private static readonly _EDIT_CRITERIA = z.object({
        countryId: z.number().int().positive(),
        displayName: z.string(),
        username: z.string(),
    })


    constructor(
        private readonly _profileService: ProfileService
    ) { }

    async getSelf(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        await this._profileService
            .getById(req.user!.id)
            .then(u => {
                res.status(200)
                    .send({ data: u })
            })
            .catch(err => next(err))
    }

    async updateSelf(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const validator = new ZodValidator<
            z.infer<typeof ProfileController._EDIT_CRITERIA>
                >(ProfileController._EDIT_CRITERIA)
        const {data, error} = validator.validate({
            displayName: req.body.displayName,
            username: req.body.username,
            countryId: req.body.countryId
                            ? z.coerce.number().parse(req.body.countryId)
                            : undefined,
        })

        if(error) {
            const errMsg = validator.getErrMessage(error)
            next(new AppError(AppErr.ValidationError, `${errMsg}`, error))
            return
        }

        await this._profileService 
            .updateById( req.user!.id, req.user!.id, data)
            .then(u => {
                res.status(200)
                    .send({data: u})
            })
            .catch(err => next(err))
    }

    async changeProfilePicture(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        // TODO
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        await this._profileService
            .getById(req.body.id)
            .then(u => {
                res.status(200)
                    .send({ data: u })
            })
            .catch(err => next(err))
    }

}