import { injectable } from 'inversify-props';
import { IApplicationService } from '../iapplication.service';
import { IPersonService } from '../iperson.service';
import { ICardService } from '../icard.service';
import { IAccountService } from '../iaccount.service';
import { map, Observable, forkJoin, of, mergeMap, from, find } from 'rxjs';
import { CurrencyType, PersonAccount } from '../../models/account.model';
import { inject } from 'inversify-props';
import { Card } from '@/models/card.model';
import { Person } from '@/models/person.model';
import { Balance } from '@/models/balance.model';
import cards from '../../mocks/cards.json';
import { IBalanceService } from '../ibalance.service';
import { BalanceInCurrency } from '../../models/balance.in.currency.model';
import { ExchangeRate } from '../../models/exchange.rate.model';
import { IExchangeRateService } from '../iexchange.rate.service';

@injectable()
export class ApplicationService implements IApplicationService {

    @inject() personService: IPersonService;
    @inject() cardService: ICardService;
    @inject() accountService: IAccountService;
    @inject() balanceService: IBalanceService;
    @inject() exchangeRateService: IExchangeRateService;

    getAccountsByPersonId(personId: string): Observable<PersonAccount[]> {
        return this.accountService.getAccountsByPersonId(personId);
    }

    getPersonsByFullNameLike(fullNameLike: string): Observable<Person[]> {
        return this.personService.getPersonsByFullNameLike(fullNameLike);
    }

    getCardsByPersonId(personId: string): Observable<Card[]> {
        return this.accountService.getAccountsByPersonId(personId).pipe(
            mergeMap((res: PersonAccount[]) => res.length ?
                forkJoin(
                    res.map(account => this.cardService.getCardsByAccountId(account.id))
                ) : of([])
            )
        ).pipe(map(res => res.flat()));
    }

    getPersonsById(personId: string): Observable<Person> | never {
        return this.personService.getPersonsById(personId);
    }

    getBalanceByCardId(cardId: string): Observable<Balance> | never {
        return from(cards as Card[])
            .pipe(
                find((card: Card) => card.id === cardId)
            ).pipe(
                mergeMap(res => {
                    if (res) {
                        return this.balanceService.getAccountBalanceByAccountId(res.accountId);
                    } else {
                        throw new Error(`Can not get balance by card id ${cardId}`)
                    }
                })
            )
    }

    getFullBalanceFromAllAccountsByPersonId(personId: string): Observable<BalanceInCurrency[]> {
        return this.getAccountsByPersonId(personId).pipe(
            mergeMap(
                res => {
                    if (res.length) {
                        return of({
                            rate: this.exchangeRateService.getExchangeRate(),
                            accounts: res,
                            balances: forkJoin(res.map(account => this.balanceService.getAccountBalanceByAccountId(account.id)))
                        })
                    } else {
                        return of({
                            rate: of([]),
                            accounts: [],
                            balances: of([])
                        });
                    }
                }
            ),
        ).pipe(
            mergeMap(res => forkJoin({ balances: res.balances, rates: res.rate }))
        ).pipe(
            map(res => this.createFullCurrencyArray(res.balances, res.rates))
        )
    }


    createFullCurrencyArray(accounts: Balance[], rates: ExchangeRate[]): BalanceInCurrency[] {
        if (accounts.length) {
            const currencyMap = new Map<String, { value: number, rate: number }>();
            const currencyArray = [];
            for (const item in CurrencyType) {
                const rate = rates.find(element => element.currency === item)?.rate ?? 0;
                currencyMap.set(item, {
                    value: 0,
                    rate
                });
                currencyArray.push({ currency: item as CurrencyType, balance: 0, rate })
            }
            accounts.forEach(account => {
                const oldElement = currencyMap.get(account.accountCurrency);
                if (oldElement) {
                    currencyMap.set(account.accountCurrency, {
                        value: this.formatMoney(oldElement.value + account.balance),
                        rate: oldElement.rate
                    })
                }
            })
            currencyArray.forEach(item => {
                Array.from(currencyMap.keys()).forEach(
                    key => {
                        const element = currencyMap.get(key);
                        if (element) {
                            item.balance = this.formatMoney(item.balance + element.value * element.rate / item.rate);
                        }
                    }
                )
            });
            return currencyArray;
        } else {
            return [];
        }
    }

    private formatMoney(value: number) {
        const formatterUSD = new Intl.NumberFormat('en-US', { useGrouping: false });
        return Number(formatterUSD.format(value));
    }

    getAccountByAccountId(accountId: string): Observable<PersonAccount | undefined> {
        return this.accountService.getAccountByAccountId(accountId);
    }
}
