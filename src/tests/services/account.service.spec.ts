import { AccountService } from '../../services/implementation/account.service';
import { IAccountService } from '../../services/iaccount.service';
import { cid, container, resetContainer } from "inversify-props";

beforeEach(() => {
    container.addSingleton<IAccountService>(AccountService);
});

afterEach(() => {
    resetContainer();
});

describe('Account service', () => {
    it('returns [] if person id empty', done => {
        const dependency = container.get<IAccountService>(cid.AccountService);
        dependency.getAccountsByPersonId('').subscribe(
            res => {
                try {
                    expect(res).toEqual([]);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        );
    })
    it('returns array with one correct element if person have one account', done => {
        const dependency = container.get<IAccountService>(cid.AccountService);
        dependency.getAccountsByPersonId('4366142e-cc97-4ac1-befd-41457f5a90ec').subscribe(
            res => {
                try {
                    expect(res.length).toBe(1);
                    expect(res[0].id).toBe('d5d14215-5018-45e2-9c9b-917c19ac879a');
                    expect(res[0].personId).toBe('4366142e-cc97-4ac1-befd-41457f5a90ec');
                    expect(res[0].accountNumber).toBe(82321076544263258688);
                    expect(res[0].accountCurrency).toBe('RUB');
                    done();
                } catch (err) {
                    done(err);
                }
            });
    })
    it('returns array with several correct elements if person have several accounts', done => {
        const dependency = container.get<IAccountService>(cid.AccountService);
        dependency.getAccountsByPersonId('fef2668f-1a26-4ac8-aeb5-da8991815aa2').subscribe(
            res => {
                try {
                    expect(res.length).toBe(3);
                    expect(res[2].id).toBe('128aed12-7f01-4f37-8cfc-0d9b87c0539e');
                    expect(res[2].personId).toBe('fef2668f-1a26-4ac8-aeb5-da8991815aa2');
                    expect(res[2].accountNumber).toBe(81696893519212459647);
                    expect(res[2].accountCurrency).toBe('EUR');
                    expect(res[1].id).toBe('8e189a88-2915-46a8-b0ed-6a9b95eccf7a');
                    expect(res[1].personId).toBe('fef2668f-1a26-4ac8-aeb5-da8991815aa2');
                    expect(res[1].accountNumber).toBe(14699226399510291633);
                    expect(res[1].accountCurrency).toBe('USD');
                    expect(res[0].id).toBe('ce626924-0bff-4273-87dc-f71c2651f690');
                    expect(res[0].personId).toBe('fef2668f-1a26-4ac8-aeb5-da8991815aa2');
                    expect(res[0].accountNumber).toBe(46671829289433132351);
                    expect(res[0].accountCurrency).toBe('RUB');
                    done();
                } catch (err) {
                    done(err);
                }
            });
    })
    it('returns account data if accountId correct', done => {
        const dependency = container.get<IAccountService>(cid.AccountService);
        dependency.getAccountByAccountId('d5d14215-5018-45e2-9c9b-917c19ac879a').subscribe(
            res => {
                try {
                    if (res) {
                        expect(res.id).toBe('d5d14215-5018-45e2-9c9b-917c19ac879a');
                        expect(res.personId).toBe('4366142e-cc97-4ac1-befd-41457f5a90ec');
                        expect(res.accountNumber).toBe(82321076544263258688);
                        expect(res.accountCurrency).toBe('RUB');
                        done();
                    } else {
                        throw new Error('Response is undefined');
                    }
                } catch (err) {
                    done(err);
                }
            });
    })
    it('returns undefined if accountId incorrect', done => {
        const dependency = container.get<IAccountService>(cid.AccountService);
        dependency.getAccountByAccountId('1d5d14215-5018-45e2-9c9b-917c19ac879a').subscribe(
            res => {
                try {
                    if (!res) {
                        expect(res).toBeUndefined();
                        done();
                    } else {
                        throw new Error(`Response is ${res}`);
                    }
                } catch (err) {
                    done(err);
                }
            });
    })
})