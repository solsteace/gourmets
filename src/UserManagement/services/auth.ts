import { CryptoHandler } from "@lib/CryptoHandler/CryptoHandler.ts";
import { AppError, AppErr } from "@lib/Error/AppError.ts";
import { TokenHandler } from "@lib/TokenHandler/TokenHandler.ts";
import { EmailAddress } from "@UserManagement/domain/values/EmailAddress.ts";
import { DisplayName, TagName } from "@UserManagement/domain/values/Name.ts";
import { HashedPassword, PlainPassword } from "@UserManagement/domain/values/Password.ts";
import { Timestamp } from "@UserManagement/domain/values/Timestamp.ts";
import { LoginAttempt } from "@UserManagement/domain/entities/LoginAttempt.ts";
import { User } from "@UserManagement/domain/aggregates/User.ts";
import { AuthRestrictionService } from "@UserManagement/domain/services/AuthRestriction.ts";
import { CountryRepo } from "@UserManagement/repositories/Country.ts";
import { UserRepo } from "@UserManagement/repositories/User.ts";

export class AuthService {
    constructor(
        private _userRepo: UserRepo,
        private _countryRepo: CountryRepo,
        private _cryptoHandler: CryptoHandler,
        private _tokenHandler: TokenHandler
    ){}

    async login(username: string, password: string): Promise<string> {
        let user: User
        let isSuccess: boolean
        const dUsername = TagName.create(username)
        return await this._userRepo.getByUsername(dUsername)
            .then(foundUser => {
                if(!foundUser)
                    throw new AppError(AppErr.NotFound, "username not found")
                user = foundUser
                return AuthRestrictionService.getCooldownByUsername(this._userRepo, dUsername)
            })
            .then(cooldown => {
                if(cooldown > 0) {
                    throw new AppError(AppErr.Unauthorized, `Too many failed login! Try again after ~${cooldown} minute(s)`)
                }
                return this._cryptoHandler.compare(password, user.password)
            })
            .then(isMatch => {
                isSuccess = isMatch
                return this._userRepo.createLoginAttempt(
                    LoginAttempt.create({
                        isOk: isSuccess, 
                        userId: user.id!,
                        attemptedAt: Timestamp.create({date: new Date()})}))
            })
            .then(_ => {
                if(!isSuccess)
                    throw new AppError(AppErr.Unauthorized, "Password doesn't match")
                return this._tokenHandler.encode({id: user.id})
            })
    }

    async register(
        username: string,
        displayName: string,
        password: string,
        email: string,
        countryId?: number
    ): Promise<string> {
        const dEmail = EmailAddress.create(email)
        const dUsername = TagName.create(username)

        const countryCheckSkip = countryId === undefined
        return await this._userRepo
            .findDuplicate({email: dEmail, username: dUsername})
            .then(foundId => {
                if(foundId)
                    throw new AppError(AppErr.BadRequest, "This username or email is already used")
                return countryCheckSkip
                    ? undefined
                    : this._countryRepo.getById(countryId)
            })
            .then(country => {
                if(!countryCheckSkip && !country)
                    throw new AppError(AppErr.BadRequest, "The selected country was not recorded in our database")
                return this._cryptoHandler.generate(password)
            })
            .then(passDigest => {
                return this._userRepo.create(
                    dEmail,
                    dUsername,
                    DisplayName.create(displayName),
                    HashedPassword.create(passDigest),
                    countryId
                )
            })
            .then(newUserId => {
                if(newUserId === undefined)
                    throw new AppError(AppErr.Internal, "Something went wrong during saving registering user")
                return this._tokenHandler.encode({id: newUserId})
            })
    }
}
