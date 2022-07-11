import { Observable, find, from, map, mergeMap, of, toArray, filter } from 'rxjs';
import accounts from '../../mocks/accounts.json';
import balances from '../../mocks/balances.json';
import { injectable } from 'inversify-props';
import { IBalanceService } from '../ibalance.service';
import { Balance, BalanceResponseItem } from '@/models/balance.model';
import { PersonAccount } from '@/models/account.model';

@injectable()
export class BalanceService implements IBalanceService {

    getAccountBalanceByAccountId(accountId: string): Observable<Balance> | never {
        return from(accounts as PersonAccount[])
            .pipe(
                find((account: PersonAccount) => account.id === accountId),
                map(res => {
                    if (res) {
                        return res;
                    } else {
                        throw new Error(`Can not find account with id ${accountId}`);
                    }
                })
            ).pipe(
                mergeMap(res => of({
                    accountId: res.id,
                    accountCurrency: res.accountCurrency,
                    balance: from(balances as BalanceResponseItem[]).pipe(
                        find((balance) => balance.accountId === accountId),
                        map(res => {
                            if (res) {
                                return res;
                            } else {
                                throw new Error(`Cannot find balance for ${accountId}`);
                            }
                        })
                    )
                }))
            ).pipe(
                mergeMap(res => res.balance.pipe(
                    mergeMap(data => of({
                        accountId: res.accountId,
                        accountCurrency: res.accountCurrency,
                        balance: data.balance
                    }))
                ))
            )
    }

}