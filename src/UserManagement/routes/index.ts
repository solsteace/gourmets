import express from "express"
import { AuthRouter } from "./auth.ts"

import { Bcrypt } from "@lib/CryptoHandler/bcrypt.ts"
import { Jwt } from "@lib/TokenHandler/jwt.ts"
import { BearerParser } from "@lib/TokenParser/bearer.ts"
import { AuthValidator } from "@middleware/AuthValidator.ts"
import { AuthService } from "@UserManagement/services/auth.ts"
import { PrismaCountry } from "@UserManagement/repositories/Prisma/PrismaCountry.ts"
import { PrismaUser } from "@UserManagement/repositories/Prisma/PrismaUser.ts"
import { ProfileRouter } from "./profile.ts"
import { ProfileService } from "@UserManagement/services/profile.ts"

// Utilities
const cryptoHandler = new Bcrypt();
const tokenHandler = new Jwt();
const tokenParser = new BearerParser();

// Repositories
const userRepo = new PrismaUser();
const countryRepo =  new PrismaCountry()

// Services
const authService = 
    new AuthService(
        userRepo, 
        countryRepo,
        cryptoHandler, 
        tokenHandler)
const profileService = 
    new ProfileService(
        userRepo, 
        countryRepo)

// Middlewares
const authValidator = new AuthValidator(tokenHandler, tokenParser)

// Routers
const authRouter = new AuthRouter(authService, authValidator)
const profileRouter = new ProfileRouter(profileService, authValidator)
const routerV1 = express.Router()
routerV1.use("/auth", authRouter.router)
routerV1.use("/profile", profileRouter.router)
routerV1.use(
    "/health",
    (_, res) => { res.send({"status": "OK"})}
)

export {routerV1}