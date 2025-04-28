import { Bcrypt } from "@lib/CryptoHandler/bcrypt.ts";
import { PrismaClient} from "@prisma/client";
import { countrySeed } from "db/seedData/Countries.ts";
import { levelSeed } from "db/seedData/Levels.ts";
import { roleSeed } from "db/seedData/Roles.ts";
import { userRolesSeed } from "db/seedData/relations/UserRoles.ts";
import { userSeed } from "db/seedData/Users.ts";
import { userStatsSeed } from "db/seedData/UserStats.ts";
import { specialtySeed } from "db/seedData/Specialties.ts";
import { placeSeed } from "db/seedData/Places.ts";
import { branchSeed } from "db/seedData/Branches.ts";
import { placeSpecialtiesSeed } from "db/seedData/relations/PlaceSpecialties.ts";
import { menuSeed } from "db/seedData/Menus.ts";
import { menuSpecialtiesSeed } from "db/seedData/relations/MenuSpecialties.ts";
import { branchMenuSeed } from "db/seedData/relations/BranchMenu.ts";

const P = new PrismaClient()

// TIP: If the number of row is abundant (say... 1k+), consider batching the
// seed data
const main = async() => {
    const cryptoHandler = new Bcrypt()
    const clearedTables: string[] = []
    let clearErr = false;

    await P.loginAttempts
        .deleteMany({where: {}})
            .then(_ => { clearedTables.push("`LoginAttempts`"); return P.userStats.deleteMany() })
            .then(_ => { clearedTables.push("`UserStats`"); return P.levels.deleteMany() })
            .then(_ => { clearedTables.push("`Levels`"); return P.userRoles.deleteMany() })
            .then(_ => { clearedTables.push("`UserRoles`"); return P.branchAdmins.deleteMany() })
            .then(_ => { clearedTables.push("`BranchAdmins`"); return P.roles.deleteMany() })
            .then(_ => { clearedTables.push("`Roles`"); return P.placeSpecialties.deleteMany() })
            .then(_ => { clearedTables.push("`PlaceSpecialties`"); return P.menuSpecialties.deleteMany() })
            .then(_ => { clearedTables.push("`MenuSpecialties`"); return P.menuBookmark.deleteMany() })
            .then(_ => { clearedTables.push("`MenuBookmarks`"); return P.menuReviewImages.deleteMany() })
            .then(_ => { clearedTables.push("`MenuReviewImages`"); return P.menuReviews.deleteMany() })
            .then(_ => { clearedTables.push("`MenuReviews`"); return P.contactMediums.deleteMany() })
            .then(_ => { clearedTables.push("`ContactMedium`"); return P.branchContacts.deleteMany() })
            .then(_ => { clearedTables.push("`BranchContacts`"); return P.placesContacts.deleteMany() })
            .then(_ => { clearedTables.push("`PlaceContacts`"); return P.branchImages.deleteMany() })
            .then(_ => { clearedTables.push("`BranchImages`"); return P.menuImages.deleteMany() })
            .then(_ => { clearedTables.push("`MenuImages`"); return P.specialties.deleteMany() })
            .then(_ => { clearedTables.push("`Specialties`"); return P.specialtyPreferences.deleteMany() })
            .then(_ => { clearedTables.push("`SpecialtyPreferences`"); return P.branchMenus.deleteMany() })
            .then(_ => { clearedTables.push("`BranchMenus`"); return P.menus.deleteMany() })
            .then(_ => { clearedTables.push("`Menus`"); return P.reservedSeats.deleteMany() })
            .then(_ => { clearedTables.push("`ReservedSeats`"); return P.seats.deleteMany() })
            .then(_ => { clearedTables.push("`Seats`"); return P.reservations.deleteMany() })
            .then(_ => { clearedTables.push("`Reservations`"); return P.branches.deleteMany() })
            .then(_ => { clearedTables.push("`Branches`"); return P.places.deleteMany() })
            .then(_ => { clearedTables.push("`Places`"); return P.users.deleteMany() })
            .then(_ => { clearedTables.push("`Users`"); return P.countries.deleteMany() })
            .catch(err => {
                console.log("Error happened during clearing data")
                console.log(err)
                clearErr = true
            })
            .finally(() => {
                console.log(` ${clearedTables.join(", ")} cleared`)
                console.log("Data clearance done")
                if(clearErr)
                    process.exit(-1)
            })

    await (async() => {
        await P.countries.createMany({ data: countrySeed })
        console.log("`Countries` inserted")
    })()

    await (async() => {
        const specialtyTemp = specialtySeed.map(s => ({
            id: s.id, 
            imagePath: s.imagePath, 
            name: s.name
        }))
        await P.specialties.createMany({ data: specialtyTemp })
        console.log("`Specialties` inserted")
    })()
    
    await (async() => {
        await P.levels.createMany( { data: levelSeed })
        console.log("`levels` inserted")
    })()

    await (async() => {
        await P.roles.createMany({ data: roleSeed })
        console.log("`roles` inserted")
    })()

    await (async() => {
        const userData = await Promise.all(
            userSeed.map(async(u) => {
            const {_foreignId, ...user} = u
            user.password = await cryptoHandler.generate(user.password)
            return {
                ...user,
                countryId: _foreignId.country
            }
        }))

        await P.users.createMany({ data: userData })
        console.log("`User` inserted")
    })()

    await (async() => {
        await P.places.createMany({
            data: placeSeed.map(p => {
                const {_foreignId, ...place} = p
                return place
            })
        })
        console.log("`Places` inserted")
    })()

    await (async() => {
        await P.branches.createMany({
            data: branchSeed.map(b => {
                const {_foreignId, ...branch} = b
                return {
                    ...branch,
                    countryId: _foreignId.country,
                    placeId: _foreignId.place
                }
            })
        })
        console.log("`Branches` inserted")
    })()

    await (async() => {
        await P.menus.createMany({
            data: menuSeed.map(m => {
                const {_foreignId, ...menu} = m
                return {
                    ...menu, 
                    placeId: _foreignId.place
                }
            })
        })
        console.log("`Menus` inserted")
    })()

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%% Relations %%%%%%%%%%%%%%%%%%%%%%%%
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    await Promise.all(
        userStatsSeed.map(async(us) => {
            const {_foreignId, ...userStats} = us
            await P.userStats.create({
                data: {
                    ...userStats,
                    userId: _foreignId.user,
                    levelId: _foreignId.level
                }
            })
        })
    )
    console.log("`UserStats` assigned")

    await (async() => {
        const userRoleAcc: {roleId: number, userId: number}[] = []
        userRolesSeed.map(ur => {
            ur.roles.map(r => {
                const {id} = r
                userRoleAcc.push({ userId: ur.user, roleId: id })
            })
        })

        await P.userRoles.createMany({ data: userRoleAcc })
        console.log("Associated `Roles` with `Users`")
    })()

    await (async() => {
        const placeSpecialtyAcc: {
            placeId: number,
            specialtyId: number}[] = []
        placeSpecialtiesSeed.forEach(ps => {
            ps.specialties.forEach(s => {
                const {id} = s
                placeSpecialtyAcc.push({
                    placeId: ps.place,
                    specialtyId: id
                })
            })
        })

        await P.placeSpecialties.createMany({data: placeSpecialtyAcc})
        console.log("Associated `Specialties` with `Places`")
    })()

    await (async() => {
        const menuSpecialtyAcc: {
            menuId: number,
            specialtyId: number }[] = []
        menuSpecialtiesSeed.forEach(ms => {
            ms.specialties.forEach(s => {
                const {id} = s
                menuSpecialtyAcc.push({
                    menuId: ms.menu,
                    specialtyId: id
                })
            })
        })

        await P.menuSpecialties.createMany({data: menuSpecialtyAcc})
        console.log("Associated `Specialties` with `Menus`")
    })()

    await (async() => {
        const branchMenuAcc: {
            branchId: number,
            menuId: number,
            price: number, }[] = []
        branchMenuSeed.forEach(bm => {
            bm.menu.forEach(m => {
                branchMenuAcc.push({
                    branchId: bm.branch,
                    menuId: m.id,
                    price: m.priceUSD
                })
            })
        })

        await P.branchMenus.createMany({data: branchMenuAcc})
        console.log("Associated `Menus` with `Branches`")
    })()

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