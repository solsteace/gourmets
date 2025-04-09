import { AuthValidator } from "@middleware/AuthValidator.ts"
import { ProfileController } from "@UserManagement/controllers/profile.ts"
import { ProfileService } from "@UserManagement/services/profile.ts"
import { Router } from "express"

export class ProfileRouter {
    public readonly router: Router
    constructor(
        profileService: ProfileService,
        private readonly _authValidator: AuthValidator
    ) {
        const controller = new ProfileController(profileService)
        this.router = Router()

        this.router.get("/:id", controller.getById.bind(controller))

        this.router.use(this._authValidator.validate.bind(this._authValidator))
        this.router.get("/", controller.getSelf.bind(controller))
        this.router.put("/", controller.updateSelf.bind(controller))
    }
}