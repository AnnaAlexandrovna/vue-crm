import { PersonAccount } from '@/models/account.model';
import { BalanceInCurrency } from '@/models/balance.in.currency.model';
import { Balance } from '@/models/balance.model';
import { Card } from '@/models/card.model';
import { Person } from '@/models/person.model';
import { Observable } from 'rxjs';

export interface IApplicationService {

    getCardsByPersonId(personId: string): Observable<Card[]>;

    getAccountsByPersonId(personId: string): Observable<PersonAccount[]>;

    getPersonsByFullNameLike(fullNameLike: string): Observable<Person[]>;

    getPersonsById(personId: string): Observable<Person> | never;
    
    getBalanceByCardId(cardId: string): Observable<Balance> | never;

    getFullBalanceFromAllAccountsByPersonId(personId: string): Observable<BalanceInCurrency[]>;

    getAccountByAccountId(accountId: string): Observable<PersonAccount | undefined>

}