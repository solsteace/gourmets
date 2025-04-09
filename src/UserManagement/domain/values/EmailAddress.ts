import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { Value } from "@sharedDomain/_Value.ts";
import { z } from "zod";

type EmailAddressProps = {
    email: string
}

export class EmailAddress extends Value<EmailAddressProps> {
    private static readonly _VALID_CRITERION = z.object({
        email: z.string().email()
    })

    toJSON(): string {
        return this.props.email
    }

    private constructor(props: EmailAddressProps) {
        super(props)
    }

    static create(email: string) {
        const props = {email}
        const validator = new ZodValidator<
            z.infer<typeof EmailAddress._VALID_CRITERION>
                >(EmailAddress._VALID_CRITERION)

        const {error, ..._} = validator.validate(props)
        if(error) 
            throw new DomainError(
                DomainErr.InvalidValue, validator.getErrMessage(error), error)
        return new EmailAddress(props)
    }

    changeEmail(email: string): EmailAddress {
        return EmailAddress.create(email)
    }

    get email() {return this.props.email}
}