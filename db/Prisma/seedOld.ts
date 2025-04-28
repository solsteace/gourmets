import { Bcrypt } from "@lib/CryptoHandler/bcrypt.ts";
import { BranchAdmins, Branches, Countries, Levels, Places, PrismaClient, Roles} from "@prisma/client";
import { branchSeed } from "db/seedData/branches.ts";
import { countrySeed } from "db/seedData/countries.ts";
import { levelSeed } from "db/seedData/levels.ts";
import { placeSeed } from "db/seedData/places.ts";
import { roleSeed } from "db/seedData/roles.ts";
import { userSeed } from "db/seedData/users.ts";

const P = new PrismaClient()
const cryptoHandler = new Bcrypt()

const main = async() => {
    console.log("Clearing all data")
    const deletionResult = await  
        P.loginAttempts
        .deleteMany({where: {}})
            .then(_ => { console.log("`LoginAttempts` cleared"); return P.userStats.deleteMany() })
            .then(_ => { console.log("`UserStats` cleared"); return P.levels.deleteMany() })
            .then(_ => { console.log("`Levels` cleared"); return P.userRoles.deleteMany() })
            .then(_ => { console.log("`UserRoles` cleared"); return P.branchAdmins.deleteMany() })
            .then(_ => { console.log("`BranchAdmins` cleared"); return P.roles.deleteMany() })
            .then(_ => { console.log("`Roles` cleared"); return P.placeSpecialties.deleteMany() })
            .then(_ => { console.log("`PlaceSpecialties` cleared"); return P.menuSpecialties.deleteMany() })
            .then(_ => { console.log("`MenuSpecialties` cleared"); return P.menuBookmark.deleteMany() })
            .then(_ => { console.log("`MenuBookmarks` cleared"); return P.menuReviewImages.deleteMany() })
            .then(_ => { console.log("`MenuReviewImages` cleared"); return P.menuReviews.deleteMany() })
            .then(_ => { console.log("`MenuReviews` cleared"); return P.contactMediums.deleteMany() })
            .then(_ => { console.log("`ContactMedium` cleared"); return P.branchContacts.deleteMany() })
            .then(_ => { console.log("`BranchContacts` cleared"); return P.placesContacts.deleteMany() })
            .then(_ => { console.log("`PlaceContacts` cleared"); return P.branchImages.deleteMany() })
            .then(_ => { console.log("`BranchImages` cleared"); return P.menuImages.deleteMany() })
            .then(_ => { console.log("`MenuImages` cleared"); return P.specialties.deleteMany() })
            .then(_ => { console.log("`Specialties` cleared"); return P.specialtyPreferences.deleteMany() })
            .then(_ => { console.log("`SpecialtyPreferences` cleared"); return P.branchMenus.deleteMany() })
            .then(_ => { console.log("`BranchMenus` cleared"); return P.menus.deleteMany() })
            .then(_ => { console.log("`Menus` cleared"); return P.reservedSeats.deleteMany() })
            .then(_ => { console.log("`ReservedSeats` cleared"); return P.seats.deleteMany() })
            .then(_ => { console.log("`Seats` cleared"); return P.reservations.deleteMany() })
            .then(_ => { console.log("`Reservations` cleared"); return P.branches.deleteMany() })
            .then(_ => { console.log("`Branches` cleared"); return P.places.deleteMany() })
            .then(_ => { console.log("`Places` cleared"); return P.users.deleteMany() })
            .then(_ => { console.log("`Users` cleared"); return P.countries.deleteMany() })
            .catch(err => {
                console.log("Error happened during clearing data")
                console.log(err)
                process.exit(-1)
            })
    console.log("`Users` cleared")
    console.log("Data clearance done")



    console.log("Inserting `Levels` data...")
    const insertedLevels = await Promise.all(
        levelSeed.map(async(l): Promise<Levels | null> => {
            return await 
                P.levels
                    .findFirst({where: {name: l.name}})
                    .then(foundL => foundL === null
                                        ? P.levels.create({data: l})
                                        : foundL)
        })
    )
    console.log(insertedLevels.every(v => v !== null)
                    ? "`Levels` data has successfully inserted"
                    : "Nothing inserted to `Levels`")


    console.log("Inserting `Countries` data...")
    const insertedCountries = await Promise.all(
        countrySeed.map(async(c): Promise<Countries | null> => {
            return await 
                P.countries
                    .findFirst({ where: {name: c.name} })
                    .then(foundC => foundC === null 
                                        ? P.countries.create({data: c})
                                        : foundC)
        })
    )
    const insertedCountriesList = Object.fromEntries(
        insertedCountries.filter(v => v !== null)
                        .map(v => [v.displayName, v.id])
    )
    console.log(insertedCountries.every(v => v !== null)
                    ? "`Countries` data has successfully inserted"
                    : "Nothing inserted to `Countries`")


    console.log("Inserting `Roles` data...")
    const insertedRoles = await Promise.all(
        roleSeed.map(async(r): Promise<Roles | null> => {
            return await 
                P.roles
                    .findFirst({where: {name: r.name}})
                    .then(foundR => foundR === null
                                    ? P.roles.create({data: r})
                                    : foundR)
        }))
    console.log(insertedRoles.every(v => v !== null)
                    ? "`Roles` data has successfully inserted"
                    : "Nothing inserted to `Roles`")


    console.log("Inserting `Places` data along with their `Branches`...")
    const insertedPlaces = await Promise.all(
        placeSeed.map(async(p): Promise<Places | null> => {
            const {country: _, ...pData} = p
            const branchData = {
                data: branchSeed
                    .filter(b => b.country === p.country)
                    .map(b => {
                        const {country, ...bData} = b
                        const branchCountryId = insertedCountriesList[country]
                        return {...bData, 
                            countryId: branchCountryId,
                        }
                    })
            }

            const place = await 
                P.places
                    .findFirst({where: {name: p.name}})
                    .then(foundP => {
                        return foundP === null
                            ? P.places.create({ 
                                data: {
                                    ...pData,
                                    Branches: {
                                        createMany: branchData
                                    }
                                }
                            })
                            : foundP
                    })

            const placeBranches = await P.branches.findMany({ where: {placeId: place.id} })
            const branchAdmins = await Promise.all(
                placeBranches.map(async(pb): Promise<Roles> => {
                    const branchAdmin = `${place.id}B${pb.id}`
                    return P.roles
                        .findFirst({where: {name: branchAdmin}})
                        .then(foundR => {
                            if(foundR !== null)
                                return foundR
                            return P.roles.create ({
                                data: {
                                    name:  branchAdmin,
                                    description: `Manages ${pb.name}`,
                                    BranchAdmins: {
                                        create: { branchId: pb.id, }
                                    }
                                }
                            })
                        })
                })
            )
            insertedRoles.push(...branchAdmins)

            const placeAdminName = `${place.id}B`
            const placeAdmin = await 
                P.roles
                    .findFirst({where: {name: placeAdminName} })
                    .then(foundR => {
                        if(foundR !== null)
                            return foundR
                        return P.roles.create({
                            data: {
                                name: placeAdminName,
                                description: `Manages all of ${place.name} branches`,
                                BranchAdmins: {
                                    createMany: {
                                        data: placeBranches.map(pb => {
                                            return {branchId: pb.id}})
                                    }
                                }
                            }
                        })
                    })
            insertedRoles.push(placeAdmin)
            return place
        }))


    console.log("Inserting `Users` data and associating their roles...")
    const insertedUsers = await Promise.all(
        userSeed.map(async(userData) => {
            const randCountryIdx = Math.floor(Math.random()*Object.values(insertedCountries).length)
            const randLevelIdx = Math.floor(Math.random()*Object.values(insertedLevels).length)
            const randRoleIdx = Math.floor(Math.random()*Object.values(insertedRoles).length)

            const randCountry = insertedCountries[randCountryIdx]!
            const randLevel = insertedLevels[randLevelIdx]!
            const randRole = insertedRoles[randRoleIdx]!

            userData.password = await cryptoHandler.generate(userData.password)
            return await P.users.upsert({
                where: {username: userData.username},
                update: {},
                create: {
                    ...userData,
                    countryId: randCountry.id,
                    UserStats: {
                        create: { 
                            levelId: randLevel.id,
                            expPoints: randLevel.requiredExp - 3
                        }
                    },
                    UserRoles: {
                        create: {
                            roleId: randRole.id
                        }
                    }
                }
            })
        }))
    console.log(insertedUsers.every(v => v !== null)
                    ? "`Users` data has successfully inserted"
                    : "Nothing has inserted to `Users`")
}

main()
    .then(async(_) => {
        await P.$disconnect()
        console.log("Finished!")
    })
    .catch(async(err) => {
        console.error(err)
        await P.$disconnect()
        process.exit(1)
    })