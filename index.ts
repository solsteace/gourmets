import "tsconfig-paths/register";
import express, { Router } from "express";
import { gEnv } from "./env.ts";
import { ErrorHandler } from "src/_shared/middlewares/ErrorHandler.ts";
import { routerV1 as userManagementRouter } from "@UserManagement/routes/index.ts";
import { administrationRouterV1 } from "@Administration/routes/index.ts";

// Set app settings
if(gEnv.DEV_ON) {
    Error.stackTraceLimit = 30
}

const timeBegin = Date.now()
const errorHandler = new ErrorHandler()

const routerV1 = Router()
routerV1.use("/account", userManagementRouter)
routerV1.use("/administration", administrationRouterV1)

const APP = express()
APP.use(express.json())
APP.use(express.urlencoded({extended: false}))
APP.use( "/api/v1", routerV1)
APP.use( "/health", (_, res) => {
    res.send({ "status": "OK",
                "uptime": `${(Date.now() - timeBegin)/1000}s` })
})
APP.use( "/", (_, res) => {
    res.status(404)
        .send({"msg": "There's nothing to see here"})}
)
APP.use(errorHandler.handle.bind(errorHandler))

APP.listen( gEnv.PORT, () => {console.log(`Server's up and running on :${gEnv.PORT}`)})

