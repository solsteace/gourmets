export interface Repository<T> {
    getMany(limit: number, offset?: number): Promise<T[]>;

    // Create is not needed here because every entity may have different needs 
    // and way to create them

    // ditto, but for updating.

    // Delete not needed here because not every entity are supposed to be deleted via itself 
    // (for example, you can't just delete userStats because it's coexist with user account)

    query(query: string): Promise<any>;
}

// (DRAFT) Normalize null to undefined, and vice versa 
// TODO: Specify what kinda object could be put here
// TODO: How do we generalize the function?
// TODO: Let's make it being able to do so recursively

export type NullableObject<T extends object> = {
    [K in keyof T]: T[K] extends undefined? T[K]: T[K] | null
}

export const undefineNull = <T extends object>(obj: NullableObject<T>): T => {
    const res = <T>Object.fromEntries(
                    Object.entries(obj)
                        .map(([k, v]) => [k, v ?? undefined] ))
    return res
}

// Future
export type UndefinableObject<T extends object> = {
    [K in keyof T]: T[K] extends null?  T[K]: T[K] | undefined
}

export const nullifyUndefined = <T extends object>(obj: UndefinableObject<T>): T => {
    const res = <T>Object.fromEntries(
                    Object.entries(obj)
                        .map(([k, v]) => [k, v ?? null]))
    return res
}