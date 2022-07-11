import { cid, container, resetContainer } from 'inversify-props';
import { IBankDetailsService } from '../../services/ibank.details.service';
import { BankDetailsService } from '../../services/implementation/bank.details.service';
import { instanceOfBankDetails } from '../../models/bank.details.model';

beforeEach(() => {
    container.addSingleton<IBankDetailsService>(BankDetailsService);
});

afterEach(() => {
    resetContainer();
});

describe('BankDetails service', () => {
    it('returns correct data if bank details founded', done => {
        const dependency = container.get<IBankDetailsService>(cid.BankDetailsService);
        dependency.getBankDetails().subscribe(
            res => {
                try {
                    if (instanceOfBankDetails(res)) {
                        expect(res.id).toBe('112a9931-8705-49d3-a201-8464c50afb44');
                        expect(res.correspondentAccount).toBe(30101810145250000000);
                        expect(res.name).toBe('АО «Россельхозколхоз Банк»');
                        expect(res.bankIdentificationCode).toBe('044525974');
                        expect(res.taxIdentificationNumber).toBe(7710140679);
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