import { CurrencyType } from "./account.model";

export interface BalanceInCurrency {
    currency: CurrencyType;
    balance: number;
    rate: number;
}

export function instanceOfBalance(object: any): object is BalanceInCurrency {
    return 'currency' in object && 'balance' in object;
}