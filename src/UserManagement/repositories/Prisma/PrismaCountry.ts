import { PrismaClient } from "@prisma/client";
import { CountryRepo } from "../Country.ts";
import { Country, CountryProps } from "@UserManagement/domain/aggregates/Country.ts";
import { DisplayName } from "@UserManagement/domain/values/Name.ts";
import { AppErr, AppError } from "@lib/Error/AppError.ts";

export class PrismaCountry implements CountryRepo {
    async getMany(limit: number, offset?: number): Promise<Country[]> {
        const P = new PrismaClient()
        const rows = await P.countries.findMany({
            take: limit,
            skip: offset
        })

        return rows.map(r => {
            const {...c} = r
            return  Country.create({
                name: DisplayName.create(c.name),
                displayName: DisplayName.create(c.displayName),
                description: c.description ?? undefined
            })
        })

    }

    async query(query: string): Promise<any> {
        throw new AppError(AppErr.NotImplemented, "PrismaCountry<query>")
    }

    async getById(id: number): Promise<Country | undefined > {
        const P = new PrismaClient()
        const row = await P.countries.findFirst({
            where: {id: id}
        })

        if(!row)
            return undefined

        return  Country.create({
            name: DisplayName.create(row.name),
            displayName: DisplayName.create(row.displayName),
            description: row.description ?? undefined
        })
    }
}