import { cid, container, resetContainer } from 'inversify-props';
import { ExchangeRateService } from '../../services/implementation/exchange.rate.service';
import { IExchangeRateService } from '@/services/iexchange.rate.service';

beforeEach(() => {
    container.addSingleton<IExchangeRateService>(ExchangeRateService);
});

afterEach(() => {
    resetContainer();
});

describe('ExchangeRate service', () => {
    it('returns correct data', done => {
        const dependency = container.get<IExchangeRateService>(cid.IExchangeRateService);
        dependency.getExchangeRate().subscribe(
            res => {
                try {
                    expect(res.length).toBe(3);
                    expect(res[0].currency).toBe('RUB');
                    expect(res[0].rate).toBe(1);
                    expect(res[1].currency).toBe('USD');
                    expect(res[1].rate).toBe(35.7);
                    expect(res[2].currency).toBe('EUR');
                    expect(res[2].rate).toBe(40);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        );
    })
})