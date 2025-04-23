import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { Value } from "@sharedDomain/_Value.ts";
import { z } from "zod";

interface ContactProps {
    value: string
    tip?: string
}

export class Contact extends Value<ContactProps> {
    private static readonly _MAX_VALUE_LEN = 31
    private static readonly _MAX_TIP_LEN = 15
    private static readonly _VALID_CRITERIA = z.object({
        value: z.string().length(Contact._MAX_VALUE_LEN),
        tip: z.string().length(Contact._MAX_TIP_LEN)
    })

    toJSON() {
        return {
            value: this.props.value,
            tip: this.props.tip,
        }
    }

    private constructor(props: ContactProps) {
        super(props)
    }   

    static create(value: string, tip?: string) {
        const props = {
            value: value,
            tip: tip
        }

        const validator = new ZodValidator<
            z.infer<typeof Contact._VALID_CRITERIA>
                >(Contact._VALID_CRITERIA)
        const {error, ..._} = validator.validate(props)

        if(error)
            throw new DomainError(
                DomainErr.InvalidValue, validator.getErrMessage(error), error)

        return new Contact(props)
    }
}