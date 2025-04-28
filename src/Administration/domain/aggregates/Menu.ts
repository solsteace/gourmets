import { Entity } from "@sharedDomain/_Entity.ts"
import { Description } from "../values/Description.ts"
import { DisplayName } from "../values/Name.ts"
import { Specialty } from "../entities/Specialty.ts"
import { AggregateRoot } from "@sharedDomain/_Aggregate.ts"
import { MenuImage } from "../entities/MenuImage.ts"
import { DomainErr, DomainError } from "@lib/Error/DomainError.ts"

interface MenuProps {
    placeId: number,

    name: DisplayName
    description: Description

    images: MenuImage[],
    specialties: Specialty[],
}

export class Menu extends AggregateRoot<MenuProps> {
    private constructor(props: MenuProps, id?: number) { 
        super(props, id)
    }

    static create(props: MenuProps, id?: number) {
        if(props.images.every(i => i.menuId === id))
            throw new DomainError(
                DomainErr.InvalidValue,
                "There is some image that is not associated with this menu via its id")
            
        return new Menu(props, id)
    }
}