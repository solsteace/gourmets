export abstract class AggregateRoot<T extends object> {
    // I read event could be placed here, but I'll add them later

    constructor(
        public props: T,
        public id?: number
    ){}

    public getId(): number | undefined {return this.id}
}