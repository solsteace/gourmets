import { AppError, AppErr } from "@lib/Error/AppError.ts";
import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { Entity } from "@sharedDomain/_Entity.ts";
import { z } from "zod";

interface RoleProps {
    name: string,
    description: string
}

export class Role extends Entity<RoleProps> {
    private static readonly _MAX_DESCRIPTION_LEN = 511;
    private static readonly _VALID_CRITERIA = z.object({
        name: z.string(),
        description: z.string()
                        .max(Role._MAX_DESCRIPTION_LEN)
    })

    private constructor(props: RoleProps, id?: number) {
        super(props);
    }

    static create(props: RoleProps, id?: number) {
        const validator = new ZodValidator<
            z.infer<typeof Role._VALID_CRITERIA>
                >(Role._VALID_CRITERIA)
        const {error, ..._} = validator.validate({...props})

        if(error) 
            throw new DomainError(
                DomainErr.InvalidValue, validator.getErrMessage(error), error)
        return new Role(props, id)
    }
}