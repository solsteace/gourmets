import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { Value } from "@sharedDomain/_Value.ts";
import { z } from "zod";

interface CaptionProps {
    text: string
}

export class Caption extends Value<CaptionProps>{
    private static readonly _MAX_CAPTION_LEN = 63
    private static readonly _VALID_CRITERIA = z.object({
        text: z.string().max(Caption._MAX_CAPTION_LEN)
    })

    toJSON(): string {
        return  this.props.text   
    }

    private constructor(props: CaptionProps) {
        super(props)
    }

    static create(text: string) {
        const props = {text: text}
        const validator  = new ZodValidator<
            z.infer<typeof Caption._VALID_CRITERIA>
                >(Caption._VALID_CRITERIA)

        const {error, ..._} = validator.validate(props)
        if(error)
            throw new DomainError(
                DomainErr.InvalidValue,
                validator.getErrMessage(error))

        return new Caption(props)
    }
}