export interface PersonAccount {
    id: string;
    personId: string;
    accountNumber: number;
    accountCurrency: CurrencyType
}

export enum CurrencyType {
    RUB = "RUB",
    USD = "USD",
    EUR = "EUR"
}
