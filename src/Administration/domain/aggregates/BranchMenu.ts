import { Entity } from "@sharedDomain/_Entity.ts";
import { Money } from "../values/Money.ts";
import { AggregateRoot } from "@sharedDomain/_Aggregate.ts";

interface BranchMenuProps {
    branchId: number
    menuId: number

    price: Money
}   

export class BranchMenu extends AggregateRoot<BranchMenuProps>{
    private constructor(props: BranchMenuProps, id?: number) {
        super(props, id)
    }

    static create(props: BranchMenuProps, id?: number) {
        return new BranchMenu(props, id)
    }
}