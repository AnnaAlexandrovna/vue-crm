import { Observable, from } from 'rxjs';
import accounts from '../../mocks/accounts.json';
import { injectable } from 'inversify-props';
import { filter, toArray, find } from 'rxjs/operators';
import { IAccountService } from '../iaccount.service';
import { PersonAccount } from '@/models/account.model';

@injectable()
export class AccountService implements IAccountService {

    getAccountsByPersonId(personId: string): Observable<PersonAccount[]> {
        return from(accounts as PersonAccount[])
            .pipe(filter((account: PersonAccount) => account.personId === personId))
            .pipe(toArray());
    }

    getAccountByAccountId(accountId: string): Observable<PersonAccount | undefined> {
        return from(accounts as PersonAccount[])
            .pipe(find((account: PersonAccount) => account.id === accountId));
    }

}