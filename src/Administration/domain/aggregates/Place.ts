import { AggregateRoot } from "@sharedDomain/_Aggregate.ts";
import { DisplayName } from "../values/Name.ts";
import { Description } from "../values/Description.ts";
import { Specialty } from "../entities/Specialty.ts";
import { PlaceContact } from "../entities/PlaceContact.ts";
import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";

interface PlaceProps {
    name: DisplayName
    description: Description

    menus: number[]
    branches: number[]
    specialties: Specialty[],
    contacts: PlaceContact[]
}

export class Place extends AggregateRoot<PlaceProps> {
    private constructor(props: PlaceProps, id?: number) {
        super(props, id)
    }

    static create(props: PlaceProps, id?: number) {
        // Should this be done here? Sure, this is needed, but this would add
        // a noticable overhead since we would at least do it once per request
        // AND that is only from this domain object. Imagine if there's more...
        //
        // Plus, does domain object has to know whether one object is actually
        // connected via foreign key? (AKA knows the detail on persistance-level)
        //
        // if(!props.branches.every(branchId => branchId === id)) 
        //     throw new DomainError(
        //         DomainErr.InvalidValue, 
        //         "Branch assigned is not related by id of the place")

        return new Place(props, id)
    }
}