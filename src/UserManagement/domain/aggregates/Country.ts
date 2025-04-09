import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { ZodValidator } from "@lib/Validator/zod.ts";
import { AggregateRoot } from "@sharedDomain/_Aggregate.ts";
import { CountryDisplayName } from "@UserManagement/domain/values/CountryName.ts";
import { DisplayName } from "@UserManagement/domain/values/Name.ts";
import { z } from "zod";

export interface CountryProps {
    name: DisplayName,
    displayName: CountryDisplayName,
    description?: string,
}

export class Country extends AggregateRoot<CountryProps> {
    private static readonly _DESCRIPTION_MAX_LEN = 511;
    private static readonly _VALID_CRITERIA = z.object({
        description: z.string()
                        .max(Country._DESCRIPTION_MAX_LEN)
                        .optional()
    })

    private constructor(props: CountryProps, id?: number) {
        super(props, id)
    }

    static create(props: CountryProps, id?: number) {
        const validator = new ZodValidator<
            z.infer<typeof Country._VALID_CRITERIA>
                >(Country._VALID_CRITERIA)
        const {error, ..._} = validator.validate({...props})

        if(error) 
            throw new DomainError(
                DomainErr.InvalidValue, validator.getErrMessage(error), error)
        return new Country(props, id)
    }
}