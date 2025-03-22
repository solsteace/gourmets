import "tsconfig-paths/register";
import express from "express";
import { gEnv } from "./env.ts";
import { ErrorHandler } from "src/_shared/middlewares/ErrorHandler.ts";

const APP = express()
const timeBegin = Date.now()
const errorHandler = new ErrorHandler()

// Set app settings
if(gEnv.DEV_ON) {
    Error.stackTraceLimit = 30
}


APP.use(express.json())
APP.use(express.urlencoded({extended: false}))
// APP.use( "/api/v1", routerV1)
APP.use( "/health", (_, res) => {
    res.send({ "status": "OK",
                "uptime": `${(Date.now() - timeBegin)/1000}s` })
})
APP.use( "/", (_, res) => {
    res.status(404)
        .send({"msg": "There's nothing to see here"})}
)
APP.use(errorHandler.handle.bind(errorHandler))

APP.listen(
    gEnv.PORT, 
    () => {console.log(`Server's up and running on :${gEnv.PORT}`)})

