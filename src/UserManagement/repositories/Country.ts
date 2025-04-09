import { Repository } from "@sharedDomain/_Repository.ts";
import { Country } from "@UserManagement/domain/aggregates/Country.ts";

export interface CountryRepo extends Repository<Country> {
    // create(country: Country): Country
    getById(id: number): Promise<Country | undefined >;
}