import { gEnv } from "@env";
import { AggregateRoot } from "@sharedDomain/_Aggregate.ts";
import { Entity } from "@sharedDomain/_Entity.ts";
import { Timestamp } from "@UserManagement/domain/values/Timestamp.ts";

const MS_IN_H = 3600*1000
const MS_IN_MIN = 60*1000

export interface LoginAttemptProps {
    userId: number,
    isOk: boolean,
    attemptedAt: Timestamp
}

export class LoginAttempt extends Entity<LoginAttemptProps> {
    private static _COOLDOWN_PERIOD = gEnv.AUTH_FAIL_COOLDOWN*MS_IN_MIN
    private static readonly MAX_FAIL_ATTEMPT = 3 // Move to env if needed

    private constructor(props: LoginAttemptProps, id?: number) {
        super(props, id)
    }

    static create(props: LoginAttemptProps, id?: number) {
        return new LoginAttempt(props, id)
    }

    getCooldown(): number {
        const timeElapsed = (new Date()).valueOf() - this.attemptedAt.date.valueOf()
        const diff =  LoginAttempt._COOLDOWN_PERIOD - timeElapsed
        return diff > 0? Math.floor(diff / MS_IN_MIN) : 0
    }

    get userId(): number {return this.props.userId}
    get isOk(): boolean {return this.props.isOk}
    get attemptedAt(): Timestamp {return this.props.attemptedAt}
}