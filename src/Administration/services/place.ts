import { Place } from "@Administration/domain/aggregates/Place.ts";
import { PlaceRepo } from "@Administration/repositories/Place.ts";
import { AppErr, AppError } from "@lib/Error/AppError.ts";

export class PlaceAdminService {
    private static readonly pageSize: number = 10
    constructor(
        private readonly _placeRepo: PlaceRepo
    ){

    }   

    // Offset calculated is page-based
    async getMany(page: number, limit: number = PlaceAdminService.pageSize): Promise<Place[]> {
        return await this._placeRepo
            .getMany(PlaceAdminService.pageSize, page*limit)
    }

    async getOne(id: number): Promise<Place> {
        return await this._placeRepo 
            .getById(id)
            .then(place => {
                if(!place)
                    throw new AppError(
                        AppErr.NotFound,
                        "Place not found")
                return place
            })
    }
}