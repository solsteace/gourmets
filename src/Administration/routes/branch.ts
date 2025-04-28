import { BranchAdminController } from "@Administration/controllers/branch.ts"
import { BranchAdminService } from "@Administration/services/branch.ts"
import { AuthValidator } from "@middleware/AuthValidator.ts"
import { Router } from "express"

export class BranchAdminRouter {
    public readonly router: Router

    constructor(
        service: BranchAdminService,
        private readonly _authValidator: AuthValidator
    ){
        const controller = new BranchAdminController(service)
        this.router = Router()

        this.router.get("/", controller.getMany.bind(controller))
        this.router.get("/:id", controller.getOne.bind(controller))
    }
}