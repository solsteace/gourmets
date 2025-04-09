import { Repository } from "@sharedDomain/_Repository.ts";
import { EmailAddress } from "@UserManagement/domain/values/EmailAddress.ts";
import { DisplayName, TagName } from "@UserManagement/domain/values/Name.ts";
import { LoginAttempt } from "@UserManagement/domain/entities/LoginAttempt.ts";
import { User } from "@UserManagement/domain/aggregates/User.ts";
import { HashedPassword } from "@UserManagement/domain/values/Password.ts";
import { Stats } from "@UserManagement/domain/entities/Stats.ts";

export interface UserRepo extends Repository<User> {
    create(
        email: EmailAddress,
        username: TagName,
        displayName: DisplayName,
        password: HashedPassword,
        countryId?: number
    ): Promise<number>
    getByUserId(userId: number): Promise<User | undefined>
    getByUsername(username: TagName): Promise<User | undefined>
    update(u: User): Promise<void>
    findDuplicate(
        credential: { email?: EmailAddress, username: TagName } 
                    | { email: EmailAddress, username?: TagName }
    ): Promise<number | undefined>
    delete(userId: number): Promise<boolean>;

    // Stats
    findStatsByExp(exp: number): Promise<Stats>
    updateStats(s: Stats): Promise<void>

    // LoginAttempt
    getLatestAuthAttemptByUsername(username: TagName, limit?: number): Promise<LoginAttempt[] >;
    createLoginAttempt(la: LoginAttempt): Promise<number>;
}