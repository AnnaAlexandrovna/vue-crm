import { PersonAccount } from '@/models/account.model';
import { Observable } from 'rxjs';

export interface IAccountService {

    getAccountsByPersonId(personId: string): Observable<PersonAccount[]>;

    getAccountByAccountId(accountId: string): Observable<PersonAccount | undefined>;
    
}