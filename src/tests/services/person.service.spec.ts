import { PersonService } from '../../services/implementation/person.service';
import { IPersonService } from '../../services/iperson.service';
import { cid, container, resetContainer } from 'inversify-props';

beforeEach(() => {
    container.addSingleton<IPersonService>(PersonService);
});

afterEach(() => {
    resetContainer();
});

describe('Person service', () => {
    it('returns [] if there is no suitable persons', done => {
        const dependency = container.get<IPersonService>(cid.PersonService);
        dependency.getPersonsByFullNameLike('qwerty').subscribe(
            res => {
                try {
                    expect(res).toEqual([]);
                    done();
                } catch (err) {
                    done(err);
                }
            });
    })
    it('returns array with one correct element if there is one suitable person', done => {
        const dependency = container.get<IPersonService>(cid.PersonService);
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
            });
    })
    it('returns array with several correct elements if there is few suitable persons', done => {
        const dependency = container.get<IPersonService>(cid.PersonService);
        dependency.getPersonsByFullNameLike('й').subscribe(
            res => {
                try {
                    expect(res.length).toBe(3);
                    expect(res[0].id).toBe('a7d688c9-1ac3-4e32-9b4d-a3e5715994ea');
                    expect(res[0].name).toBe('Алексей');
                    expect(res[0].surname).toBe('Алексеев');
                    expect(res[0].patronymic).toBe('Алексеевич');
                    expect(res[1].id).toBe('9bbe1b76-c4e6-4287-9f77-3c7247c7e4b6');
                    expect(res[1].name).toBe('Сергей');
                    expect(res[1].surname).toBe('Сергеев');
                    expect(res[1].patronymic).toBe('Сергеевич');
                    expect(res[2].id).toBe('c59a9c34-c12d-4d14-97ee-c9af07b924e8');
                    expect(res[2].name).toBe('Николай');
                    expect(res[2].surname).toBe('Николаев');
                    expect(res[2].patronymic).toBe('Николаевич');
                    done();
                } catch (err) {
                    done(err);
                }
            }
        );
    })
    it('returns user if userId correct', done => {
        const dependency = container.get<IPersonService>(cid.PersonService);
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
        );
    })
    it('returns error if userId incorrect', done => {
        const dependency = container.get<IPersonService>(cid.PersonService);
        dependency.getPersonsById('1a7d688c9-1ac3-4e32-9b4d-a3e5715994ea').subscribe({
            next: (res) => done(`Response is ${res}`),
            error: (err) => {
                expect(err.message).toBe('Can not find person with id 1a7d688c9-1ac3-4e32-9b4d-a3e5715994ea');
                done();
            }
        }
        );
    })
})