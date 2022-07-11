import { CardService } from '../../services/implementation/card.service';
import { ICardService } from '../../services/icard.service';
import { cid, container, resetContainer } from 'inversify-props';

beforeEach(() => {
    container.addSingleton<ICardService>(CardService);
});

afterEach(() => {
    resetContainer();
});

describe('Card service', () => {
    it('returns [] if account id empty', done => {
        const dependency = container.get<ICardService>(cid.CardService);
        dependency.getCardsByAccountId('').subscribe(
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
    it('returns array with one correct element if person have one card', done => {
        const dependency = container.get<ICardService>(cid.CardService);
        dependency.getCardsByAccountId('ce626924-0bff-4273-87dc-f71c2651f690').subscribe(
            res => {
                try {
                    expect(res.length).toBe(1);
                    expect(res[0].id).toBe('6f46696e-f53c-449f-a731-0f2d15ed21b6');
                    expect(res[0].accountId).toBe('ce626924-0bff-4273-87dc-f71c2651f690');
                    expect(res[0].cardNumber).toBe(5666178020590728);
                    expect(res[0].paymentSystemType).toBe('VISA');
                    expect(res[0].description).toBe('string');
                    done();
                } catch (err) {
                    done(err);
                }
            },
        );
    })
    it('returns array with several correct elements if person have several cards', done => {
        const dependency = container.get<ICardService>(cid.CardService);
        dependency.getCardsByAccountId('8e189a88-2915-46a8-b0ed-6a9b95eccf7a').subscribe(
            res => {
                try {
                    expect(res.length).toBe(2);
                    expect(res[0].id).toBe('e1e0658b-a817-48ab-817c-29154825fe1e');
                    expect(res[0].accountId).toBe('8e189a88-2915-46a8-b0ed-6a9b95eccf7a');
                    expect(res[0].cardNumber).toBe(2935109858921401);
                    expect(res[0].paymentSystemType).toBe('MASTERCARD');
                    expect(res[0].description).toBe('string');
                    expect(res[1].id).toBe('11e0658b-a817-48ab-817c-29154825fe1e');
                    expect(res[1].accountId).toBe('8e189a88-2915-46a8-b0ed-6a9b95eccf7a');
                    expect(res[1].cardNumber).toBe(2935109858921402);
                    expect(res[1].paymentSystemType).toBe('МИР');
                    expect(res[1].description).toBe('string');
                    done();
                } catch (err) {
                    done(err);
                }
            });
    })
})