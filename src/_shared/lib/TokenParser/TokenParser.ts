export interface TokenParser {
    parseToken: (token: string) => string;
}