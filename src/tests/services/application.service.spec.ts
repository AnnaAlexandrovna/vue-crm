import { AccountService } from '../../services/implementation/account.service';
import { IAccountService } from '../../services/iaccount.service';
import { CardService } from '../../services/implementation/card.service';
import { ICardService } from '../../services/icard.service';
import { PersonService } from '../../services/implementation/person.service';
import { IPersonService } from '../../services/iperson.service';
import { ApplicationService } from '../../services/implementation/application.service';
import { IApplicationService } from '../../services/iapplication.service';
import { cid, container, resetContainer } from 'inversify-props';
import { instanceOfBalance } from '../../models/balance.model';
import { BalanceService } from '../../services/implementation/balance.service';
import { IBalanceService } from '../../services/ibalance.service';
import { ExchangeRateService } from '../../services/implementation/exchange.rate.service';
import { IExchangeRateService } from '../../services/iexchange.rate.service';

beforeEach(() => {
  container.addSingleton<ICardService>(CardService);
  container.addSingleton<IPersonService>(PersonService);
  container.addSingleton<IApplicationService>(ApplicationService);
  container.addSingleton<IAccountService>(AccountService);
  container.addSingleton<IBalanceService>(BalanceService);
  container.addSingleton<IExchangeRateService>(ExchangeRateService);
});

afterEach(() => {
  resetContainer();
});

describe('Application service', () => {
  it('calls getAccountsByPersonId and return correct data', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
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
  it('calls getCardsByPersonId and return correct data if there is few card', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getCardsByPersonId('fef2668f-1a26-4ac8-aeb5-da8991815aa2').subscribe(
      res => {
        try {
          expect(res.length).toBe(3);
          expect(res[0].id).toBe('6f46696e-f53c-449f-a731-0f2d15ed21b6');
          expect(res[0].accountId).toBe('ce626924-0bff-4273-87dc-f71c2651f690');
          expect(res[0].cardNumber).toBe(5666178020590728);
          expect(res[0].paymentSystemType).toBe('VISA');
          expect(res[0].description).toBe('string');
          expect(res[1].id).toBe('e1e0658b-a817-48ab-817c-29154825fe1e');
          expect(res[1].accountId).toBe('8e189a88-2915-46a8-b0ed-6a9b95eccf7a');
          expect(res[1].cardNumber).toBe(2935109858921401);
          expect(res[1].paymentSystemType).toBe('MASTERCARD');
          expect(res[1].description).toBe('string');
          expect(res[2].id).toBe('11e0658b-a817-48ab-817c-29154825fe1e');
          expect(res[2].accountId).toBe('8e189a88-2915-46a8-b0ed-6a9b95eccf7a');
          expect(res[2].cardNumber).toBe(2935109858921402);
          expect(res[2].paymentSystemType).toBe('МИР');
          expect(res[2].description).toBe('string');
          done();
        } catch (err) {
          done(err);
        }
      });
  })

  it('calls getCardsByPersonId and return correct data if there is one card', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getCardsByPersonId('4366142e-cc97-4ac1-befd-41457f5a90ec').subscribe(
      res => {
        try {
          expect(res.length).toBe(1);
          expect(res[0].id).toBe('c3999d5b-1ab9-4e06-b0f4-89ed4dce4f79');
          expect(res[0].accountId).toBe('d5d14215-5018-45e2-9c9b-917c19ac879a');
          expect(res[0].cardNumber).toBe(7059089723819732);
          expect(res[0].paymentSystemType).toBe('МИР');
          expect(res[0].description).toBe('string');
          done();
        } catch (err) {
          done(err);
        }
      });
  })

  it('calls getCardsByPersonId and return correct data if there is no person', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getCardsByPersonId('4366142e-cc97-4ac1-befd-41457f5a90ec1').subscribe(
      res => {
        try {
          expect(res.length).toBe(0);
          done();
        } catch (err) {
          done(err);
        }
      });
  })
  it('calls getPersonsByFullNameLike and return correct data', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getPersonsByFullNameLike('кирилл').subscribe(
      res => {
        try {
          expect(res.length).toBe(1);
          expect(res[0].id).toBe('4c1e32f4-25a5-4319-9e29-05fd1fc21589');
          expect(res[0].name).toBe('Кирилл');
          expect(res[0].surname).toBe('Кириллов');
          expect(res[0].patronymic).toBe('Кириллович');
          done();
        } catch (err) {
          done(err);
        }
      }
    );
  });
  it('calls getPersonsById and returns user if userId correct', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getPersonsById('a7d688c9-1ac3-4e32-9b4d-a3e5715994ea').subscribe(
      res => {
        try {
          expect(res.id).toBe('a7d688c9-1ac3-4e32-9b4d-a3e5715994ea');
          expect(res.name).toBe('Алексей');
          expect(res.surname).toBe('Алексеев');
          expect(res.patronymic).toBe('Алексеевич');
          done();
        } catch (err) {
          done(err);
        }
      }
    )
  });
  it('calls getBalanceByCardId and return correct data if cartId correct', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getBalanceByCardId('c3999d5b-1ab9-4e06-b0f4-89ed4dce4f79').subscribe(
      res => {
        try {
          if (instanceOfBalance(res)) {
            expect(res.accountId).toBe('d5d14215-5018-45e2-9c9b-917c19ac879a');
            expect(res.accountCurrency).toBe('RUB');
            expect(res.balance).toBe(12.3);
            done();
          } else {
            throw new Error('Response not correct');
          }
        } catch (err) {
          done(err);
        }
      }
    );
  });

  it('calls getBalanceByCardId and return correct data if cartId incorrect', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getBalanceByCardId('1c3999d5b-1ab9-4e06-b0f4-89ed4dce4f79').subscribe({
      next: (res) => done(`Response is ${res}`),
      error: (error) => {
        expect(error.message).toBe('Can not get balance by card id 1c3999d5b-1ab9-4e06-b0f4-89ed4dce4f79');
        done();
      }
    });
  });

  it('calls getFullBalanceFromAllAccounts and return correct data if personId correct', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getFullBalanceFromAllAccountsByPersonId('4366142e-cc97-4ac1-befd-41457f5a90ec').subscribe(
      res => {
        try {
          if (res.length) {
            expect(res.length).toBe(3);
            expect(res[0].currency).toBe('RUB');
            expect(res[0].balance).toBe(12.3);
            expect(res[0].rate).toBe(1);
            expect(res[1].currency).toBe('USD');
            expect(res[1].balance).toBe(0.345);
            expect(res[1].rate).toBe(35.7);
            expect(res[2].currency).toBe('EUR');
            expect(res[2].balance).toBe(0.308);
            expect(res[2].rate).toBe(40);
            done();
          } else {
            throw new Error('Response not correct');
          }
        } catch (err) {
          done(err);
        }
      }
    );
  });

  it('calls getFullBalanceFromAllAccounts and return [] if personId incorrect', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getFullBalanceFromAllAccountsByPersonId('14366142e-cc97-4ac1-befd-41457f5a90ec').subscribe(
      res => {
        try {
          expect(res.length).toBe(0);
          done();
        } catch (err) {
          done(err);
        }
      }
    );
  })
  it('calls getPersonsById and returns error if userId incorrect', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
    dependency.getPersonsById('1a7d688c9-1ac3-4e32-9b4d-a3e5715994ea').subscribe({
      next: (res) => done(`Response is ${res}`),
      error: (err) => {
        expect(err.message).toBe('Can not find person with id 1a7d688c9-1ac3-4e32-9b4d-a3e5715994ea');
        done();
      }
    }
    );
  })
  it('calls getAccountByAccountId and returns account data if accountId correct', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
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
  it('calls getAccountByAccountId and returns undefined if accountId incorrect', done => {
    const dependency = container.get<IApplicationService>(cid.ApplicationService);
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
});