// import { PrismaBranch } from "@Administration/repositories/Prisma/PrismaBranch.ts";
import { PrismaPlaces } from "@Administration/repositories/Prisma/PrismaPlace.ts";
// import { BranchAdminService } from "@Administration/services/branch.ts";
import { PlaceAdminService } from "@Administration/services/place.ts";
import { Jwt } from "@lib/TokenHandler/jwt.ts";
import { BearerParser } from "@lib/TokenParser/bearer.ts";
import { AuthValidator } from "@middleware/AuthValidator.ts";
import { PlaceAdminRouter } from "./place.ts";
// import { BranchAdminRouter } from "./branch.ts";
import { Router } from "express";

// Middlewares
const tokenHandler = new Jwt()
const tokenParser = new BearerParser()
const authValidator = new AuthValidator(tokenHandler, tokenParser)

// Repositories
const placeRepo = new PrismaPlaces()
// const branchRepo = new PrismaBranch()

// Application Services
const placeAdminService = new PlaceAdminService(placeRepo)
// const branchAdminService = new BranchAdminService(branchRepo)

// Routers
const placeAdminRouter = new PlaceAdminRouter(placeAdminService)
// const branchAdminRouter = new BranchAdminRouter(branchAdminService, authValidator)

const administrationRouterV1 = Router()
administrationRouterV1.use(authValidator.validate.bind(authValidator))
administrationRouterV1.use("/place", placeAdminRouter.router)
// administrationRouterV1.use("/branch", branchAdminRouter.router)
administrationRouterV1.use(
    "/health",
    (_, res) => { res.send({"status": "OK"})}
)

export {administrationRouterV1}