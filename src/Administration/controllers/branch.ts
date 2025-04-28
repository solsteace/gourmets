import { BranchAdminService } from "@Administration/services/branch.ts";
import { AppErr, AppError } from "@lib/Error/AppError.ts";
import { AuthenticatedRequest } from "@middleware/AuthValidator.ts";
import { NextFunction, Response } from "express";

export class BranchAdminController {
    constructor(
        private readonly _service: BranchAdminService
    ) { }

    async getMany(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const pageStart = Number(req.params.page ?? "0")
        if(Number.isNaN(pageStart))
            next(new AppError(
                AppErr.BadRequest, "page query param should be a number"))

        return await this._service
            .getMany(pageStart)
            .then(branches => {
                res.status(200).send({data: branches})
            })
            .catch(err => next(err))
    }

    async getOne(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        // If id invalid, trigger not found
        const id = Number.isNaN(Number(req.params.id))
                ? -1 
                : Number(req.params.id)

        return await this._service
            .getOne(id)
            .then(branch => {
                res.status(200).send({data: branch})
            })
            .catch(err => next(err))
    }
}