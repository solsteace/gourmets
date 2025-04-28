import { Entity } from "@sharedDomain/_Entity.ts";
import { EventEmitterAsyncResource } from "events";
import { Caption } from "../values/Caption.ts";

interface BranchImageProps {
    branchId: number,
    imagePath: string,
    caption: Caption
}

export class BranchImage extends Entity<BranchImageProps> {
    private constructor(props: BranchImageProps, id?: number) {
        super(props, id)
    }

    static create(props: BranchImageProps, id?: number) {
        return new BranchImage(props, id)
    }
}