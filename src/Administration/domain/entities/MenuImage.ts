import { Entity } from "@sharedDomain/_Entity.ts"
import { Caption } from "../values/Caption.ts"

interface MenuImageProps {
    menuId: number,
    path: string,
    caption: Caption
}

export class MenuImage extends Entity<MenuImageProps> {
    private constructor(props: MenuImageProps, id?: number) { 
        super(props, id)
    }

    static create(props: MenuImageProps, id?: number) {
        return new MenuImage(props, id)
    }

    get menuId(): number {return this.menuId}
    get path(): string {return this.path}
    get caption(): Caption {return this.caption}

    set caption(c: Caption) {this.caption = c}
}