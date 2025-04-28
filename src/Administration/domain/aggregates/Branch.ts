import { AggregateRoot } from "@sharedDomain/_Aggregate.ts"
import { DisplayName } from "../values/Name.ts"
import { BranchContact } from "../entities/BranchContact.ts"
import { BranchMenu } from "./BranchMenu.ts"
import { BranchImage } from "../entities/BranchImage.ts"

interface BranchProps {
    placeId: number,
    countryId: number,

    name: DisplayName,
    address: string,
    latitude: number,
    longitude: number
    startOpenAt: Date,
    endOpenAt: Date,
    timeZone: string,

    menus: number[],
    contacts: BranchContact[],
    images: BranchImage[],
}

export class Branch extends AggregateRoot<BranchProps> {
    private constructor(props: BranchProps, id?: number) {
        super(props, id)
    }

    static create(props: BranchProps, id?: number) {
        return new Branch(props, id)
    }
}