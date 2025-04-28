import { PlaceRepo } from "@Administration/repositories/Place.ts";

export class PlaceAdminService {
    static async hasAccess(
        placeRepo: PlaceRepo, 
        placeId: number, 
        userId: number
    ): Promise<boolean> {
        const placeAdmins =  await placeRepo.getAdminOfPlaceById(placeId)
        return placeAdmins.includes(userId)
    }
}