import dotenv from "dotenv";
dotenv.config()

// additional env variable checking...
if (undefined == process.env.PORT
    || undefined == process.env.ENV
    || undefined == process.env.DB_PORT
    || undefined == process.env.DB_PASS
    || undefined == process.env.DB_NAME
    || undefined == process.env.DB_USER
    || undefined == process.env.DB_HOST
    || undefined == process.env.TOKEN_LIFETIME
    || undefined == process.env.TOKEN_SECRET
    || undefined == process.env.AUTH_FAIL_COOLDOWN
) {
    const requiredVariables = [
        "PORT", "ENV",
        "DB_PORT", "DB_PASS", "DB_NAME", "DB_USER", "DB_HOST",
        "TOKEN_LIFETIME", "TOKEN_SECRET",
        "AUTH_FAIL_COOLDOWN"
    ]
    const sRequiredVariables = requiredVariables.map(v => `\`${v}\``)
    throw `The following variables must be provided:\n${sRequiredVariables.join(", ")}`
}


export const gEnv = {
    "PORT": process.env.PORT,

    "DB_HOST": process.env.DB_HOST,
    "DB_PORT": Number(process.env.DB_PORT),
    "DB_PASS": process.env.DB_PASS,
    "DB_NAME": process.env.DB_NAME,
    "DB_USER": process.env.DB_USER,

    "TOKEN_SECRET": process.env.TOKEN_SECRET,
    "TOKEN_LIFETIME": Number(process.env.TOKEN_LIFETIME), // In minutes

    "AUTH_FAIL_COOLDOWN": Number(process.env.AUTH_FAIL_COOLDOWN),

    // Development mode settings
    "DEV_ON": process.env.ENV === "DEVEL",
    "DEV_TOKEN_LIFETIME": Number(process.env.TOKEN_LIFETIME), // In minutes
}