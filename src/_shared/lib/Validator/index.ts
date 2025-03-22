export interface Validator {
    getErrMessage(error: any): string;
    validate(val: any): void;
}