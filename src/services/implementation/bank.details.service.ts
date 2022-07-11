import { BankDetails } from '../../models/bank.details.model';
import { Observable, of } from 'rxjs';
import bank from '../../mocks/bank.json';
import { injectable } from 'inversify-props';
import { IBankDetailsService } from '../ibank.details.service';

@injectable()
export class BankDetailsService implements IBankDetailsService {

    getBankDetails(): Observable<BankDetails> {
        return of(bank);
    }

}
