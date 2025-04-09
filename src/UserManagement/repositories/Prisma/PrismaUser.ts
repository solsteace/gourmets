import { UserRepo } from "../User.ts";
import { Prisma, PrismaClient } from "@prisma/client";
import { AppErr, AppError } from "@lib/Error/AppError.ts";
import { User } from "@UserManagement/domain/aggregates/User.ts";
import { EmailAddress } from "@UserManagement/domain/values/EmailAddress.ts";
import { DisplayName, TagName } from "@UserManagement/domain/values/Name.ts";
import { HashedPassword } from "@UserManagement/domain/values/Password.ts";
import { Country } from "@UserManagement/domain/aggregates/Country.ts";
import { Stats } from "@UserManagement/domain/entities/Stats.ts";
import { LoginAttempt } from "@UserManagement/domain/entities/LoginAttempt.ts";
import { Timestamp } from "@UserManagement/domain/values/Timestamp.ts";
import { prismaWithTx } from "@lib/ORM/Prisma.ts";
import { connect } from "http2";
import { UserStatsUpdateService } from "@UserManagement/domain/services/UserStatsUpdate.ts";

export class PrismaUser implements UserRepo {
    async getMany(limit: number, offset?: number): Promise<User[]> {
        const P = new PrismaClient()
        const rows = await P.users.findMany({
            include: {
                Countries: true,
                UserStats: {
                    include: {Levels: true}
                }
            },
            take: limit,
            skip: offset ?? 0
        })

        return rows.map(r => {
            const {UserStats, Countries, ...u} = r
            if(UserStats === null) 
                throw "Data anomaly detected<PrismaProfile>: UserStats not available"

            const country = Countries === null
                ? undefined
                : Country.create({
                    name: DisplayName.create(Countries.name),
                    displayName: DisplayName.create(Countries.displayName),
                    description: Countries.description ?? undefined
                }, Countries.id)


            const stats =  Stats.create({
                userId: u.id,
                levelId: UserStats.levelId,
                expPoints: UserStats.expPoints,
                levelName: DisplayName.create(UserStats.Levels.name),
                imagePath: UserStats.Levels.imagePath
            }, UserStats.id)

            return User.create({
                email: EmailAddress.create(u.email),
                username: TagName.create(u.username),
                password: HashedPassword.create(u.password),
                displayName: DisplayName.create(u.displayName),
                deletedAt: u.deletedAt ?? undefined,
                countryId: u.countryId ?? undefined,
                lastLoggedAt: u.lastLoggedAt ?? undefined,
                activatedAt: u.verifiedAt ?? undefined,
                imagePath: u.imagePath ?? undefined,

                country: country,
                stats: stats
            }, u.id)
        })
    }

    query(query: string): Promise<any> {
        throw new AppError(AppErr.NotImplemented, "PrismaProfile<query>")
    }

    async create(
        email: EmailAddress,
        username: TagName,
        displayName: DisplayName,
        password: HashedPassword,
        countryId?: number
    ): Promise<number> {
        const P = new PrismaClient()
        const row = await P.users.create({
            data: {
                username: username.name,
                displayName: displayName.name,
                password: password.password,
                email: email.email,
                Countries: {
                    connect: {id: countryId}
                },
                UserRoles: {
                    create: {
                        Roles: {
                            connect: {name: "user"}
                        }
                    }
                },
                UserStats: {
                    create: {
                        expPoints: 0,
                        Levels: {
                            connect: {requiredExp: 0}
                        }
                    }
                }
            },
        })

        return row.id
    }

    async getByUserId(userId: number): Promise<User | undefined> {
        const P = new PrismaClient()
        const row = await P.users.findFirst({
            where: {id: userId},
            include: {
                Countries: true,
                UserStats: {
                    include: {Levels: true}
                }
            },
        })

        if(!row) 
            return undefined

        const {UserStats, Countries, ...u} = row
        if(UserStats === null) 
            throw "Data anomaly detected<PrismaProfile>: UserStats not available"

        const country = Countries === null
            ? undefined
            : Country.create({
                name: DisplayName.create(Countries.name),
                displayName: DisplayName.create(Countries.displayName),
                description: Countries.description ?? undefined
            }, Countries.id)

        const stats =  Stats.create({
            userId: u.id,
            levelId: UserStats.levelId,
            expPoints: UserStats.expPoints,
            levelName: DisplayName.create(UserStats.Levels.name),
            imagePath: UserStats.Levels.imagePath
        }, UserStats.id)

        return User.create({
            email: EmailAddress.create(u.email),
            username: TagName.create(u.username),
            password: HashedPassword.create(u.password),
            displayName: DisplayName.create(u.displayName),
            deletedAt: u.deletedAt ?? undefined,
            countryId: u.countryId ?? undefined,
            lastLoggedAt: u.lastLoggedAt ?? undefined,
            activatedAt: u.verifiedAt ?? undefined,
            imagePath: u.imagePath ?? undefined,

            country: country,
            stats: stats
        }, u.id)
    }

    async getByUsername(username: TagName): Promise<User | undefined> {
        const P = new PrismaClient()
        const row = await P.users.findFirst({
            where: {username: username.name},
            include: {
                Countries: true,
                UserStats: {
                    include: {Levels: true}
                }
            },
        })

        if(!row) 
            return undefined

        const {UserStats, Countries, ...u} = row
        if(UserStats === null) 
            throw "Data anomaly detected<PrismaProfile>: UserStats not available"

        const country = Countries === null
            ? undefined
            : Country.create({
                name: DisplayName.create(Countries.name),
                displayName: DisplayName.create(Countries.displayName),
                description: Countries.description ?? undefined
            }, Countries.id)

        const stats =  Stats.create({
            userId: u.id,
            levelId: UserStats.levelId,
            expPoints: UserStats.expPoints,
            levelName: DisplayName.create(UserStats.Levels.name),
            imagePath: UserStats.Levels.imagePath
        }, UserStats.id)

        return User.create({
            email: EmailAddress.create(u.email),
            username: TagName.create(u.username),
            password: HashedPassword.create(u.password),
            displayName: DisplayName.create(u.displayName),
            deletedAt: u.deletedAt ?? undefined,
            countryId: u.countryId ?? undefined,
            lastLoggedAt: u.lastLoggedAt ?? undefined,
            activatedAt: u.verifiedAt ?? undefined,
            imagePath: u.imagePath ?? undefined,

            country: country,
            stats: stats
        }, u.id)
    }

    async findDuplicate(
        credential: { email?: EmailAddress, username: TagName } 
                    | { email: EmailAddress, username?: TagName }
    ) : Promise<number | undefined> {
        const P = new PrismaClient();
        const row = await P.users.findFirst({
            select: {id: true},
            where: {
                OR: [
                    {username: credential.username?.name},
                    {email: credential.email?.email}
                ]
            },
        })

        return row === null? undefined: row.id
    }

    async getLatestAuthAttemptByUsername(username: TagName, limit?: number): Promise<LoginAttempt[]> {
        const P = new PrismaClient()
        const rows = await P.loginAttempts.findMany({
            where: {Users: {username: username.name}},
            take: limit ?? 1
        })

        return rows.map(r => LoginAttempt.create({ 
                userId: r.userId, 
                isOk: r.isOk,
                attemptedAt: Timestamp.create({date: r.attemptedAt}),
            }, r.id)
        )
    }

    async createLoginAttempt(la: LoginAttempt): Promise<number> {
        const P = new PrismaClient()
        const newAttempt = await P.loginAttempts.create( {
            data: {
                Users: {
                    connect: { id: la.userId }
                },
                isOk: la.isOk,
                attemptedAt: la.attemptedAt.date,
            }
        })
        return newAttempt.id
    }

    async update(u: User): Promise<void> {
        const P = new PrismaClient()
        await P.users.update({
            where: {id: u.id!},
            data: {
                username: u.username,
                displayName: u.displayName,
                email: u.email,
                password: u.password,
                countryId: u.countryId,
                imagePath: u.imagePath,
            }
        })
    }

    async findStatsByExp(exp: number): Promise<Stats> {
        const P = new PrismaClient()
        const nextLevel = await P.levels.findFirst({
            where: {
                requiredExp: {lte: exp }
            },
            orderBy: {requiredExp: "desc"}
        })
        if(!nextLevel)
            console.error("PrismaUser<addUserExp>: New level wasn't found. It might caused by adding negative exp point")
            throw new AppError(AppErr.BadRequest, "Error during projecting updated user level")
    }

    async updateStats(s: Stats): Promise<void> {
        const P = new PrismaClient()

        await P.userStats.update({
            where: {userId: s.user},
            data: {...s }
        })
    }

    async delete(userId: number): Promise<boolean> {
        throw "PrismaUser<delete>: Not Implemented Yet"
    }
}