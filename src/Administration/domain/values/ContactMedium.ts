import { DisplayName } from "./Name.ts";
import { Value } from "@sharedDomain/_Value.ts";

interface ContactMediumProps {
    name: DisplayName,
    urlPrefix: string,
    iconPath: string,
}

export class ContactMedium extends Value<ContactMediumProps>{
    private constructor(props: ContactMediumProps) {
        super(props)
    }

    toJSON() {
        return {
            name: this.props.name,
            urlPrefix: this.props.urlPrefix,
            iconPath: this.props.iconPath,
        }
    }

    static create(name: string, urlPrefix: string, iconPath: string) {
        const props = {
            name: DisplayName.create(name),
            urlPrefix: urlPrefix,
            iconPath: iconPath
        }

        return new ContactMedium(props)
    }
}