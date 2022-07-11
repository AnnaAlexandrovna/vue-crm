import { Balance } from '@/models/balance.model';
import { Observable } from 'rxjs';

export interface IBalanceService {

    getAccountBalanceByAccountId(accountId: string): Observable<Balance> | never;

}