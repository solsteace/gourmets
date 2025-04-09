import { Entity } from "@sharedDomain/_Entity.ts";
import { DisplayName } from "@UserManagement/domain/values/Name.ts";

interface StatsProps {
    userId: number, 
    levelId: number, 
    expPoints: number, 
    imagePath: string,
    levelName: DisplayName
}

export class Stats extends Entity<StatsProps> {
    private constructor(props: StatsProps, id?: number) {
        super(props, id)
    }

    static create(props: StatsProps, id?: number) {
        return new Stats(props, id)
    }

    get user(): number | undefined {return this.props.userId}
    get expPoint(): number {return this.props.expPoints}
    get imagePath(): string {return this.props.imagePath}
    get levelName(): string {return this.props.levelName.name}
    get levelId(): number {return this.props.levelId}

    set expPoint(exp: number) {this.props.expPoints = exp}
    set levelId(id: number) {this.props.expPoints = id}
}