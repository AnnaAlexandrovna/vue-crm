import { BankDetails } from '@/models/bank.details.model';
import { Observable } from 'rxjs';

export interface IBankDetailsService {

    getBankDetails(): Observable<BankDetails>;

}