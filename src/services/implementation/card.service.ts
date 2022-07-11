import { Observable, from } from 'rxjs';
import cards from '../../mocks/cards.json';
import { injectable } from 'inversify-props';
import { filter, toArray } from 'rxjs/operators';
import { ICardService } from '../icard.service';
import { Card } from '@/models/card.model';

@injectable()
export class CardService implements ICardService {

    getCardsByAccountId(accountId: string): Observable<Card[]> {
        return from(cards as Card[])
            .pipe(filter((card: Card) => card.accountId === accountId))
            .pipe(toArray());
    }

}