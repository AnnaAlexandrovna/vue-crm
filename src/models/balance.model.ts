import { CurrencyType } from "./account.model";

export interface Balance {
    accountId: string;
    accountCurrency: CurrencyType;
    balance: number;
}

export interface BalanceResponseItem {
    accountId: string;
    balance: number;
}

export function instanceOfBalance(object: any): object is Balance {
    return 'accountId' in object && 'accountCurrency' in object && 'balance' in object;
}