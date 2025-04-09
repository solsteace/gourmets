import { AppError, AppErr } from "@lib/Error/AppError.ts";
import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { Value } from "@sharedDomain/_Value.ts";
import { z } from "zod";

type PasswordProps = {
    password: string
}

export class PlainPassword extends Value<PasswordProps> {
    private static readonly _MAX_LEN = 63;
    private static readonly _MIN_LEN = 6;
    private static readonly _CHECK_PASS = (): boolean => {
        return true
    }
    private static readonly _VALID_CRITERIA = z.object({
        password: z.string()
                    .min(PlainPassword._MIN_LEN)
                    .max(PlainPassword._MAX_LEN)
    })

    toJSON(): undefined {
        return undefined
    }

    private constructor(props: PasswordProps) {
        super(props)
    }

    static create(password: string) {
        const props = { password: password }
        const validator = new ZodValidator<
            z.infer<typeof PlainPassword._VALID_CRITERIA>
                >(PlainPassword._VALID_CRITERIA)

        const {error, ..._} = validator.validate(props)
        if(error) 
            throw new DomainError(
                DomainErr.InvalidValue, validator.getErrMessage(error), error)
        return new PlainPassword(props)
    }

    get password() {return this.props.password}
}

export class HashedPassword extends Value<PasswordProps> {
    private static readonly _MAX_LEN = 63;
    private static readonly _MIN_LEN = 6;
    private static readonly _VALID_CRITERIA = z.object({
        password: z.string()
                    .min(HashedPassword._MIN_LEN)
                    .max(HashedPassword._MAX_LEN)
    })

    toJSON(): undefined {
        return undefined
    }

    private constructor(props: PasswordProps) {
        super(props)
    }

    static create(password: string) {
        const props = { password: password }
        const validator = new ZodValidator<
            z.infer<typeof HashedPassword._VALID_CRITERIA>
                >(HashedPassword._VALID_CRITERIA)

        const {error, ..._} = validator.validate(props)
        if(error) 
            throw new DomainError(
                DomainErr.InvalidValue, validator.getErrMessage(error), error)
        return new HashedPassword(props)
    }

    get password() {return this.props.password}
}