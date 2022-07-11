import { Observable, of } from 'rxjs';
import rates from '../../mocks/exchange.rates.json';
import { injectable } from 'inversify-props';
import { IExchangeRateService } from '../iexchange.rate.service';
import { ExchangeRate } from '@/models/exchange.rate.model';

@injectable()
export class ExchangeRateService implements IExchangeRateService {

    getExchangeRate(): Observable<ExchangeRate[]> {
        return of(rates as ExchangeRate[]);
    }

}