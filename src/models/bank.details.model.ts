export interface BankDetails {
    id: string;
    correspondentAccount: number;
    name: string;
    bankIdentificationCode: string;
    taxIdentificationNumber: number
}

export function instanceOfBankDetails(object: any): object is BankDetails {
    return 'id' in object
        && 'correspondentAccount' in object
        && 'name' in object
        && 'bankIdentificationCode' in object
        && 'taxIdentificationNumber' in object;
}