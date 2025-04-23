import { Place } from "@Administration/domain/aggregates/Place.ts";
import { PlaceRepo } from "../Place.ts";
import { PrismaClient } from "@prisma/client";
import { DisplayName } from "@Administration/domain/values/Name.ts";
import { Description } from "@Administration/domain/values/Description.ts";
import { Contact } from "@Administration/domain/values/Contact.ts";
import { PlaceContact } from "@Administration/domain/entities/PlaceContact.ts";
import { ContactMedium } from "@Administration/domain/values/ContactMedium.ts";
import { Specialty } from "@Administration/domain/entities/Specialty.ts";

export class PrismaPlaces implements PlaceRepo {
    async getMany(limit: number, offset?: number): Promise<Place[]> {
        const P = new PrismaClient()
        const rows = await P.places.findMany({
            include: {
                Branches: { 
                    select: {id: true} 
                },
                Menus: {
                    select: {id: true}
                },
                PlacesContacts: {
                    include: { ContactMediums: true }
                },
                PlaceSpecialties: {
                    select: {Specialties: true},
                },
            },
            take: limit,
            skip: offset ?? 0
        })

        return rows.map(r => {
            const {Branches, 
                PlaceSpecialties,
                PlacesContacts, 
                Menus,
                ...p} = r
            
            const specialties = PlaceSpecialties.map(({Specialties: s}) => {
                return Specialty.create({
                    name: DisplayName.create(s.name),
                    imagePath: s.imagePath
                }, s.id)
            })

            const contacts = PlacesContacts.map(pc => {
                const {ContactMediums: cm, ..._} = pc
                const c = Contact.create(pc.contact, pc.tip ?? undefined)
                const m = ContactMedium.create(cm.name, cm.urlPrefix, cm.iconPath)

                return PlaceContact.create({
                    placeId: p.id,
                    contact: c,
                    medium: m
                })
            })

            return Place.create({
                name: DisplayName.create(p.name),
                description: Description.create(p.description ?? ""),
                branches: Branches.map(b => b.id),
                menus: Menus.map(m => m.id),
                
                contacts: contacts,
                specialties: specialties
            }, p.id)
        })
    }

    async query(query: string): Promise<any> {
        throw "PrismaPlaces<query>: Not Implemented Yet"
    }

    async getById(id: number): Promise<Place | undefined> {
        const P = new PrismaClient()
        const row = await P.places.findFirst({
            where: {id: id},
            include: {
                Branches: { 
                    select: {id: true} 
                },
                Menus: {
                    select: {id: true}
                },
                PlacesContacts: {
                    include: { ContactMediums: true }
                },
                PlaceSpecialties: {
                    select: {Specialties: true},
                },
            }
        })

        if(!row)
            return undefined

        const {Branches, 
            PlaceSpecialties,
            PlacesContacts, 
            Menus,
            ...p} = row
        
        const specialties = PlaceSpecialties.map(({Specialties: s}) => {
            return Specialty.create({
                name: DisplayName.create(s.name),
                imagePath: s.imagePath
            }, s.id)
        })

        const contacts = PlacesContacts.map(pc => {
            const {ContactMediums: cm, ..._} = pc
            const c = Contact.create(pc.contact, pc.tip ?? undefined)
            const m = ContactMedium.create(cm.name, cm.urlPrefix, cm.iconPath)

            return PlaceContact.create({
                placeId: p.id,
                contact: c,
                medium: m
            })
        })

        return Place.create({
            name: DisplayName.create(p.name),
            description: Description.create(p.description ?? ""),
            branches: Branches.map(b => b.id),
            menus: Menus.map(m => m.id),
            
            contacts: contacts,
            specialties: specialties
        }, p.id)
    }

    async getAdminOfPlaceById(id: number): Promise<number[]> {
        const P = new PrismaClient()
        const row = await P.placeOwners.findFirst({
            where: {placeId: id},
            select: {
                Roles: {
                    select: {
                        UserRoles: { select: { userId: true}}
                    }
                }
            }
        })

        if(!row)
            return []
        return row.Roles.UserRoles
            .map(ur => ur.userId)
    }
}