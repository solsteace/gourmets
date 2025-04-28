import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { Value } from "@sharedDomain/_Value.ts";

interface MoneyProps {
    value: number
}

export class Money extends Value<MoneyProps> {
    private constructor(props: MoneyProps) {
        super(props)
    }

    static create(value: number) {
        if(value < 0) 
            throw new DomainError(
                DomainErr.InvalidValue,
                "Money should be positive")

        const props = {
            value: value
        }

        return new Money(props)
    }
}