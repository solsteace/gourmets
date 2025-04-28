import { Branch } from "@Administration/domain/aggregates/Branch.ts";
import { BranchRepo } from "@Administration/repositories/Branch.ts";
import { AppErr, AppError } from "@lib/Error/AppError.ts";

export class BranchAdminService {
    private static readonly pageSize: number = 10

    constructor(
        private readonly _branchRepo: BranchRepo
    ){}

    async getMany(page: number, limit: number = BranchAdminService.pageSize): Promise<Branch[]> {
        return await this._branchRepo
            .getMany(BranchAdminService.pageSize, page*limit)
    }

    async getOne(id: number): Promise<Branch> {
        return await this._branchRepo 
            .getById(id)
            .then(branch => {
                if(!branch)
                    throw new AppError(
                        AppErr.NotFound,
                        "Branch not found")
                return branch
            })
    }
}