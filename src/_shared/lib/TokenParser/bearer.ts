import { TokenParser } from "./TokenParser.ts";

export class BearerParser implements TokenParser {
    public parseToken(token: string): string {
        return token.replace("Bearer ", "")
    }
}