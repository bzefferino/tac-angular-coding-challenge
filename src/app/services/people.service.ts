// NOTE FOR JOSH: Thought of doing an HTTP Service with potential interceptor for bad API calls, but 
// I decided against it for the purpose of this as i think you wanna see more design etc. Error modal 
// is the extent of error handling for this demo
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  private people: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);

  private readonly PEOPLE_ENDPOINT = `${environment.baseUrl}/people`;

  getAll(): Observable<Person[]> {
    if (this.people.value && this.people.value.length > 0) {
      return (of(this.people.value));
    }
    else {
      return this.http.get<Person[]>(this.PEOPLE_ENDPOINT)
        .pipe(
          map(x => {
            this.people.next(x as Person[]);
            return x as Person[];
          })
        );
    }
  }

  getById(id: string): Observable<Person> {
    return this.http.get<Person>(this.PEOPLE_ENDPOINT + `/${id}`);
  }
}
