import { cid, container, resetContainer } from 'inversify-props';
import { IBalanceService } from '../../services/ibalance.service';
import { BalanceService } from '../../services/implementation/balance.service';
import { instanceOfBalance } from '../../models/balance.model';

beforeEach(() => {
    container.addSingleton<IBalanceService>(BalanceService);
});

afterEach(() => {
    resetContainer();
});

describe('Balance service', () => {
    it('returns error if there is no account with id', done => {
        const dependency = container.get<IBalanceService>(cid.IBalanceService);
        dependency.getAccountBalanceByAccountId('123').subscribe({
            next: (res) => done(`Response is ${res}`),
            error: (error) => {
                expect(error.message).toBe('Can not find account with id 123');
                done();
            }
        });
    })
    it('returns correct data account with id', done => {
        const dependency = container.get<IBalanceService>(cid.IBalanceService);
        dependency.getAccountBalanceByAccountId('d5d14215-5018-45e2-9c9b-917c19ac879a').subscribe(
            res => {
                try {
                    if (instanceOfBalance(res)) {
                        expect(res.accountId).toBe('d5d14215-5018-45e2-9c9b-917c19ac879a');
                        expect(res.accountCurrency).toBe('RUB');
                        expect(res.balance).toBe(12.3);
                        done();
                    } else {
                        throw new Error('Response is not correct');
                    }
                } catch (err) {
                    done(err);
                }
            }
        );
    })
})