import { AppErr, AppError } from "@lib/Error/AppError.ts";
import { User } from "@UserManagement/domain/aggregates/User.ts";
import { UserStatsUpdateService } from "@UserManagement/domain/services/UserStatsUpdate.ts";
import { CountryRepo } from "@UserManagement/repositories/Country.ts";
import { UserRepo } from "@UserManagement/repositories/User.ts";

export class ProfileService {
    constructor(
        private readonly _userRepo: UserRepo,
        private readonly _countryRepo: CountryRepo,
    ) { }

    async getById(userId: number): Promise<User> {
        return await this._userRepo
            .getByUserId(userId)
            .then(u => {
                if(!u)
                    throw new AppError(AppErr.NotFound, "User not found")
                return u
            })
    }

    async updateById(
        editorId: number,
        userId: number, 
        data: { // Editable fields
            displayName: string
            username: string
            countryId: number
        }
    ): Promise<User> {
        const countryCheckSkip = data.countryId === undefined
        let oldU: User
        return await this._userRepo
            .getByUserId(userId)
            .then(u => {
                if(!u)
                    throw new AppError(AppErr.NotFound, "User not found")

                if(u.id! !== editorId)
                    throw new AppError(AppErr.Forbidden, "Profile owned by other user")

                if(u.username == data.username && u.id != userId)
                    throw new AppError(AppErr.BadRequest, "Username already taken")
                
                oldU = u
                return countryCheckSkip
                    ? undefined
                    : this._countryRepo.getById(data.countryId)
            })
            .then(c => {
                if(!countryCheckSkip && !c)
                    throw new AppError(AppErr.BadRequest, "The selected country was not recorded in our database")

                oldU.countryId = data.countryId
                oldU.username = data.username
                oldU.displayName = data.displayName
                return this._userRepo.update(oldU)
            })
            .then(_ => this._userRepo.getByUserId(userId))
            .then(u => {
                if(!u)
                    throw new AppError(AppErr.NotFound, "User not found after updating")
                return u
            })
    }

    async levelUp(userId: number, exp: number): Promise<User> {
        let user: User
        return await this._userRepo
            .getByUserId(userId)
            .then(u => {
                if(!u)
                    throw new AppError(AppErr.NotFound, "User not found")
                user = u
                return UserStatsUpdateService.addExp( this._userRepo, u.stats, exp)
            })
            .then(s => {
                user.stats = s
                return this._userRepo.updateStats(s)
            })
            .then(_ => user)
    }

    // TODO: A lot of data depends on this entity, so we better do this after
    // the handlers of the data has been done
    async deleteById(userId: number): Promise<boolean> {
        throw "ProfileService<deleteById>: Not Implemented Yet"
    }
}