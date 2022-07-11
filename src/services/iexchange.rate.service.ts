import { ExchangeRate } from '@/models/exchange.rate.model';
import { Observable } from 'rxjs';

export interface IExchangeRateService {

    getExchangeRate(): Observable<ExchangeRate[]>;
    
}