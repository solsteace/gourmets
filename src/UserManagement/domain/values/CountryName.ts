import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { Value } from "@sharedDomain/_Value.ts";
import { z } from "zod";

interface CountryNameProps {
    name: string
}

export class CountryDisplayName extends Value<CountryNameProps> {
    // Criteria were based on 
    private static readonly _MAX_NAME_LEN = 3
    private static readonly _VALID_CRITERIA = z.object({
        name: z.string().length(CountryDisplayName._MAX_NAME_LEN)
    })

    private constructor(props: CountryNameProps) {
        super(props)
    }

    static create(props: CountryNameProps) {
        const validator = new ZodValidator<
            z.infer<typeof CountryDisplayName._VALID_CRITERIA>
                >(CountryDisplayName._VALID_CRITERIA)
        const {error, ..._} = validator.validate({...props})
        if(error)
            throw new DomainError(
                DomainErr.InvalidValue, validator.getErrMessage(error), error)
        return new CountryDisplayName(props)
    }

}