import { Value } from "@sharedDomain/_Value.ts";
import { z } from "zod";

interface DescriptionProps {
    text: string
}

export class Description extends Value<DescriptionProps> {
    private static readonly _MAX_TEXT_LEN = 511
    private static readonly _VALID_CRITERIA = z.object({
        text: z.string().max(Description._MAX_TEXT_LEN)
    })

    toJSON(): string {
        return this.props.text
    }

    private constructor(props: DescriptionProps) {
        super(props)
    }

    static create(text: string): Description {
        return new Description({text: text})
    }
}