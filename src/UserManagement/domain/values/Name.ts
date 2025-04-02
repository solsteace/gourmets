import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { Value } from "@sharedDomain/_Value.ts";
import { z } from "zod";

export interface Name {
    get name(): string
}

export interface NameProps {
    name: string
} 

export class TagName extends Value<NameProps> implements Name{
    private static readonly _INVALID_NAME_MESSAGE = 
        "Tagname should be alphanumeric, have no space, and starts with alphabets"
    private static readonly _CHECK_NAME = 
        (name: string): boolean => {
            return /^[A-Za-z][A-Za-z0-9]*/.test(name)
        };
    private static readonly _VALID_CRITERIA = z.object({
        name: z.string()
                .refine( TagName._CHECK_NAME,
                        { message: TagName._INVALID_NAME_MESSAGE})
    })

    private constructor(props: NameProps) {
        super(props)
    }

    static create(name: string) { 
        const props = {name}
        const validator = new ZodValidator<
            z.infer<typeof TagName._VALID_CRITERIA>
                >(TagName._VALID_CRITERIA)

        const {error, ..._} = validator.validate(props)
        if(error) 
            throw new DomainError(
                DomainErr.InvalidValue, validator.getErrMessage(error), error)
        return new TagName(props)
    }

    get name() {return this.props.name}
}

export class DisplayName extends Value<NameProps> implements Name{
    private static readonly _INVALID_NAME_MESSAGE = 
        "Displayname should only contain letters, spaces, and numbers"
    private static readonly _CHECK_NAME = 
        (name: string): boolean => {
            // TODO: Put regex that allows UTF-8 letters too
            return /^[A-Za-z0-9 ]+/.test(name)
        };
    private static readonly _VALID_CRITERIA = z.object({
        name: z.string()
                .refine( DisplayName._CHECK_NAME,
                        { message: DisplayName._INVALID_NAME_MESSAGE})
    })

    private constructor(props: NameProps) {
        super(props)
    }

    static create(name: string) { 
        const props = {name}
        const validator = new ZodValidator<
            z.infer<typeof DisplayName._VALID_CRITERIA>
                >(DisplayName._VALID_CRITERIA)

        const {error, ..._} = validator.validate(props)
        if(error) 
            throw new DomainError(
                DomainErr.InvalidValue, validator.getErrMessage(error), error)
        return new DisplayName(props)
    }

    get name() {return this.props.name}
}