import { AppError, AppErr } from "@lib/Error/AppError.ts"

// Inspired from: https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/
export abstract class Entity<T extends object> {
    constructor(
        protected props: T, 
        protected id?: number
    ) {}

    public isEmpty(): boolean {
        return this.id === undefined
    }

    public equals(e: Entity<T>): boolean {
        return e.id === this.id
    }

    public toJSON(): string {
        throw new AppError(AppErr.NotImplemented, "Entity<toJSON>: To be implemented")
    }

    public getId(): number | undefined {return this.id}
}