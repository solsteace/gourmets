import { Entity } from "@sharedDomain/_Entity.ts";
import { Contact } from "../values/Contact.ts";
import { ContactMedium } from "../values/ContactMedium.ts";

interface PlaceContactProps {
    placeId: number,
    contact: Contact,
    medium: ContactMedium;
}

export class PlaceContact extends Entity<PlaceContactProps> {
    private constructor(props: PlaceContactProps, id?: number) {
        super(props, id)
    }

    static create(props: PlaceContactProps, id?: number) {
        return new PlaceContact(props, id)
    }
}