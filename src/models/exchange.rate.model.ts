import { CurrencyType } from "./account.model";

export interface ExchangeRate {
    currency: CurrencyType;
    rate:  number;
}