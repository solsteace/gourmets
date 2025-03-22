import { AppError, AppErr } from "@lib/Error/AppError.ts";

export abstract class Value<T extends object> {
    constructor( protected props: T){}

    equals(rhs: T): boolean {
        throw new AppError(AppErr.NotImplemented, "Value<equals>: To be implemented")
    }
}