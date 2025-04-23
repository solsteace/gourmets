import { Entity } from "@sharedDomain/_Entity.ts";
import { DisplayName } from "../values/Name.ts";

interface SpecialtyProps {
    name: DisplayName,
    imagePath: string
}

export class Specialty extends Entity<SpecialtyProps> {
    private constructor(props: SpecialtyProps, id?: number) {
        super(props, id)
    }

    static create(props: SpecialtyProps, id?: number) {
        return new Specialty(props, id)
    }
}