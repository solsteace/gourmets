import { AggregateRoot } from "@sharedDomain/_Aggregate.ts";
import { Country } from "./Country.ts";
import { Stats } from "../entities/Stats.ts";
import { DomainErr, DomainError } from "@lib/Error/DomainError.ts";
import { EmailAddress } from "@UserManagement/domain/values/EmailAddress.ts";
import { DisplayName, TagName } from "@UserManagement/domain/values/Name.ts";
import { HashedPassword } from "@UserManagement/domain/values/Password.ts";

export interface UserProps {
    email: EmailAddress,
    username: TagName,
    password: HashedPassword,
    displayName: DisplayName,

    countryId?: number,
    imagePath?: string,
    activatedAt?: Date,
    lastLoggedAt?: Date,
    deletedAt?: Date,

    country?: Country
    stats: Stats
}

export class User extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: number) {
        super(props, id)
    }

    static create(props: UserProps, id?: number) {
        const mismatchCountry = props.countryId !== props.country?.getId()
        if(mismatchCountry)
            throw new DomainError(
                DomainErr.InvalidValue, "Country.id doesn't match with User.countryId")

        const mismatchStats = props.stats.user !== id
        if(mismatchStats)
            throw new DomainError(
                DomainErr.InvalidValue, "Stats.userId doesn't match with User.id")
        return new User(props, id)
    }

    get countryId() {return this.props.countryId}
    get displayName() { return this.props.displayName.name}
    get email() {return this.props.email.email}
    get username() {return this.props.username.name}
    get password() {return this.props.password.password}
    get imagePath() { return this.props.imagePath}
    get activatedAt() {return this.props.activatedAt}
    get lastLoggedAt() {return this.props.lastLoggedAt}
    get deletedAt() { return this.props.deletedAt}
    get stats() {return this.props.stats}

    set username(name: string) { this.props.username = TagName.create(name) }
    set countryId(countryId: number | undefined) {this.props.countryId = countryId }
    set displayName(name: string) {this.props.displayName = DisplayName.create(name)}
    set stats(s: Stats) {this.props.stats = s}
}