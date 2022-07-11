export interface Card {
    id: string;
    accountId: string;
    cardNumber: number;
    paymentSystemType: PaymentSystemType;
    description: string;
}

export enum PaymentSystemType {
    MIR = "МИР",
    VISA = "VISA",
    MASTERCARD = "MASTERCARD"
}
