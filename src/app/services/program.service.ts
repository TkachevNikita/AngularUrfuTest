// Импортируем необходимые модули
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { IProgram } from '../interfaces/program.interface';
import { ProgramModel } from '../models/program.model';
import { IProgramDetails } from '../interfaces/program-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  private apiUrl = '/api/programs';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const username = 'user';
    const password = 'pass!w0Rd';
    const base64Credentials = btoa(`${username}:${password}`);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${base64Credentials}`,
    });
  }

    /**
     * Получение образовательных программ
     * @returns
     */
    public getPrograms(): Observable<ProgramModel[]> {
      return this.requestPrograms()
        .pipe(
            map((data: IProgram[]) => data.map((program: IProgram) => new ProgramModel(program)))
        );
    }

    private requestPrograms(): Observable<IProgram[]> {
      const headers = this.getHeaders();

      return this.http.get<IProgram[]>(this.apiUrl, { headers })
        .pipe(
            map(data => {
                return data;
            }),
            catchError(error => {
                return of([]);
            })
        );
    }
}
