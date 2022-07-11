import { Card } from '@/models/card.model';
import { Observable } from 'rxjs';

export interface ICardService {

    getCardsByAccountId(accountId: string): Observable<Card[]>;
    
}