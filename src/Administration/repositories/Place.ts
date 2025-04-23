import { Place } from "@Administration/domain/aggregates/Place.ts";
import { Repository } from "@sharedDomain/_Repository.ts";

export interface PlaceRepo extends Repository<Place> {
    getById(id: number): Promise<Place | undefined>
    getAdminOfPlaceById(id: number): Promise<number[]>
}