import { AppError, AppErr } from "@lib/Error/AppError.ts"

// Inspired from: https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/
export abstract class Entity<T extends object> {
    constructor(
        protected props: T, 
        protected id?: number
    ) {}

    toJSON(): T {
        return this.props
    }

    public isEmpty(): boolean {
        return this.id === undefined
    }

    public equals(e: Entity<T>): boolean {
        return e.id === this.id
    }

    public getId(): number | undefined {return this.id}
}