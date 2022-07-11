import { Person } from '@/models/person.model';
import { Observable } from 'rxjs';

export interface IPersonService {

    getPersonsByFullNameLike(fullNameLike: string): Observable<Person[]>;
    getPersonsById(personId: string): Observable<Person> | never;

}