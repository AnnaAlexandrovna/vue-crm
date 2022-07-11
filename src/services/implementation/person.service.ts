import { Person } from '@/models/person.model';
import { Observable, from, find, map } from 'rxjs';
import persons from '../../mocks/persons.json';
import { injectable } from 'inversify-props';
import { IPersonService } from '../iperson.service';
import { filter, toArray } from 'rxjs/operators';

@injectable()
export class PersonService implements IPersonService {

    getPersonsByFullNameLike(fullNameLike: string): Observable<Person[]> {
        return from(persons)
            .pipe(filter((person: Person) => {
                const fullName = `${person.name} ${person.surname}`.toLowerCase();
                return fullName.includes(fullNameLike.toLowerCase());
            }))
            .pipe(toArray());
    }

    getPersonsById(personId: string): Observable<Person>| never {
        return from(persons)
            .pipe(
                find((person: Person) => person.id === personId),
                map(res => {
                    if (res) {
                        return res;
                    } else {
                        throw new Error(`Can not find person with id ${personId}`);
                    }
                })
            )
    }


}
