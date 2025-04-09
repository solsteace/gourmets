import { UserRepo } from "@UserManagement/repositories/User.ts";
import { Stats } from "../entities/Stats.ts";

export class UserStatsUpdateService {
    static async addExp(
        userRepo: UserRepo, 
        oldStats: Stats, 
        exp: number
    ): Promise<Stats> {
        // Upon adding expPoint, what would be my level?
        const projectedLevel = await userRepo.findStatsByExp(oldStats.expPoint + exp)
        oldStats.expPoint = oldStats.expPoint + exp
        oldStats.levelId = projectedLevel.levelId
        return oldStats
    }
}