import { Value } from "@sharedDomain/_Value.ts"

export interface TimestampProps {
    date: Date
}

export class Timestamp extends Value<TimestampProps> {
    private constructor(props: TimestampProps) {
        super(props)
    }
    toJSON(): Date {
        return this.date
    }

    static create(props: TimestampProps) {
        // Do validation... (I dunno what tho, for now)
        return new Timestamp(props)
    }

    get date() {return this.props.date}
}