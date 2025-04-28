import { Entity } from "@sharedDomain/_Entity.ts";
import { Contact } from "../values/Contact.ts";
import { ContactMedium } from "../values/ContactMedium.ts";

interface BranchContactProps {
    branchId: number,
    contact: Contact,
    medium: ContactMedium
}

export class BranchContact extends Entity<BranchContactProps> {
    private constructor(props: BranchContactProps, id?: number) {
        super(props, id)
    }

    static create(props: BranchContactProps, id?: number) {
        return new BranchContact(props, id)
    }
}