import { Branch } from "@Administration/domain/aggregates/Branch.ts";
import { Repository } from "@sharedDomain/_Repository.ts";

export interface BranchRepo extends Repository<Branch> {
    getById(id: number): Promise<Branch | undefined>
}