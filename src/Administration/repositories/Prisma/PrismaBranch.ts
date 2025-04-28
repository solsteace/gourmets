import { Branch } from "@Administration/domain/aggregates/Branch.ts";
import { BranchRepo } from "../Branch.ts";
import { PrismaClient } from "@prisma/client";
import { DisplayName } from "@Administration/domain/values/Name.ts";
import { BranchMenu } from "@Administration/domain/aggregates/BranchMenu.ts";
import { BranchContact } from "@Administration/domain/entities/BranchContact.ts";
import { ContactMedium } from "@Administration/domain/values/ContactMedium.ts";
import { Contact } from "@Administration/domain/values/Contact.ts";
import { BranchImage } from "@Administration/domain/entities/BranchImage.ts";
import { Caption } from "@Administration/domain/values/Caption.ts";

export class PrismaBranch implements BranchRepo {
    async getMany(limit: number, offset?: number): Promise<Branch[]> {
        const P = new PrismaClient()
        const rows = await P.branches.findMany({
            include: {
                BranchMenus: {select: {id: true}},
                BranchContacts: {
                    include: { ContactMediums: true }
                },
                BranchImages: {},
            },
            take: limit,
            skip: offset ?? 0
        })
    
        return rows.map(r => {
            const contacts = r.BranchContacts.map(bc => {
                const {ContactMediums: medium} = bc
                return BranchContact.create({
                    branchId: bc.branchId,
                    contact: Contact.create( bc.displayText ?? "", bc.value),
                    medium: ContactMedium.create(
                        medium.name,
                        medium.urlPrefix,
                        medium.iconPath
                    )
                }, bc.id)
            })

            const images = r.BranchImages.map(bi => {
                return BranchImage.create({
                    branchId: bi.branchId,
                    imagePath: bi.imagePath,
                    caption: Caption.create(bi.caption)
                }, bi.id)
            })

            return Branch.create({
                placeId: r.placeId,
                countryId: r.countryId,
                name: DisplayName.create(r.name),
                address: r.address,
                timeZone: r.timeZone,
                startOpenAt: r.startOpenAt,
                endOpenAt: r.endOpenAt,
                longitude: r.longitude ?? 0, // TODO: Adjust after schema change
                latitude: r.latitude ?? 0, // TODO: Adjust after schema change

                menus: r.BranchMenus.map(bm => bm.id),
                images: images,
                contacts: contacts
            }, r.id)

        })
    }

    async query(query: string): Promise<any> {
        throw "PrismaBranch<query>: Not Implemented Yet"
    }

    async getById(id: number): Promise<Branch | undefined> {
        const P = new PrismaClient()
        const row = await P.branches.findFirst({
            where: {id: id},
            include: {
                BranchMenus: {select: {id: true}},
                BranchContacts: {
                    include: { ContactMediums: true }
                },
                BranchImages: {},
            }
        })
    
        if(!row)
            return undefined

        const contacts = row.BranchContacts.map(bc => {
            const {ContactMediums: medium} = bc
            return BranchContact.create({
                branchId: bc.branchId,
                contact: Contact.create( bc.displayText ?? "", bc.value),
                medium: ContactMedium.create(
                    medium.name,
                    medium.urlPrefix,
                    medium.iconPath
                )
            }, bc.id)
        })

        const images = row.BranchImages.map(bi => {
            return BranchImage.create({
                branchId: bi.branchId,
                imagePath: bi.imagePath,
                caption: Caption.create(bi.caption)
            }, bi.id)
        })

        return Branch.create({
            placeId: row.placeId,
            countryId: row.countryId,
            name: DisplayName.create(row.name),
            address:row.address,
            timeZone: row.timeZone,
            startOpenAt: row.startOpenAt,
            endOpenAt: row.endOpenAt,
            longitude: row.longitude ?? 0, // TODO: Adjust after schema change
            latitude: row.latitude ?? 0, // TODO: Adjust after schema change

            menus: row.BranchMenus.map(bm => bm.id),
            images: images,
            contacts: contacts
        }, id)
    }
}