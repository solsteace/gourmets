import { PlaceAdminController } from "@Administration/controllers/place.ts";
import { PlaceAdminService } from "@Administration/services/place.ts";
import { AuthValidator } from "@middleware/AuthValidator.ts";
import { Router } from "express";

export class PlaceAdminRouter {
    public readonly router: Router

    constructor(
        service: PlaceAdminService,
    ) {
        const controller = new PlaceAdminController(service)
        this.router = Router()

        this.router.get("/", controller.getMany.bind(controller))
        this.router.get("/:id", controller.getOne.bind(controller))
    }
}