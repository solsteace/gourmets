import { PlaceAdminService } from "@Administration/services/place.ts";
import { AuthenticatedRequest } from "@middleware/AuthValidator.ts";
import { NextFunction, Response } from "express";

export class PlaceAdminController {
    constructor(
        private readonly _service: PlaceAdminService
    ) {}

    async getMany(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const pageStart = Number.isNaN(Number(req.query.page ?? "0")) 
                        ? 0 : Number(req.query.page ?? "0")

        return await this._service
            .getMany(pageStart)
            .then(places => {
                res.status(200).send({data: places})
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
            .then(place => {
                res.status(200).send({data: place})
            })
            .catch(err => next(err))
    }
}