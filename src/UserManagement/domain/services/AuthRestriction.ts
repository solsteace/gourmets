import { TagName } from "@UserManagement/domain/values/Name.ts";
import { UserRepo } from "@UserManagement/repositories/User.ts";

export class AuthRestrictionService {
    static async getCooldownByUsername(userRepo: UserRepo, username: TagName): Promise<number> {
        // TODO: Move maximum number fo failed attempt to env
        const attempts =  await userRepo.getLatestAuthAttemptByUsername(username, 3)
        const haveFailedAttempt = 
            attempts.length > 0
            && attempts.every(a => !a.isOk && a.getCooldown() > 0) 
        return haveFailedAttempt ? attempts.pop()!.getCooldown() : 0
    }
}