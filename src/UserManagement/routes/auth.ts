import { AuthValidator } from "@middleware/AuthValidator.ts"
import { Router } from "express"
import { AuthController } from "../controllers/auth.ts"
import { AuthService } from "@UserManagement/services/auth.ts"

export class AuthRouter {
    public readonly router: Router
    constructor(
        authService: AuthService,
        private readonly _authValidator: AuthValidator
    ) {
        const controller = new AuthController(authService)
        this.router = Router()

        // Learning note: Since the method contains `this` on its body and we don't
        // pass the entire instance that contains it, we should tell about it presence
        // explicitly
        this.router.post("/login", controller.login.bind(controller))
        this.router.post("/register", controller.register.bind(controller))
    }
}