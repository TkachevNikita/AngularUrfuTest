// Импортируем необходимые модули
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, mergeMap, of } from 'rxjs';
import { IProgram } from '../interfaces/program.interface';
import { ProgramModel } from '../models/program.model';
import { IProgramDetails } from '../interfaces/program-details.interface';
import { ProgramDetailsModel } from '../models/program-details.model';
import { IModule } from '../interfaces/module.interface';
import { IRPM } from '../interfaces/rpm.interface';
import { ErrorService } from './error.service';

interface ModulesResponse {
    modules: number[]
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = '/api';

  constructor(
    private http: HttpClient,
    private _errorService: ErrorService
  ) {}

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

    public getProgramDetails(id: number): Observable<ProgramDetailsModel> {
        return this.requestProgramDetails(id)
          .pipe(
              map((programDetails: IProgramDetails) => new ProgramDetailsModel(programDetails))
          )
    }

    public getProgramModules(id: number): Observable<IModule[]> {
        return this.requestModules(id);
    }

    public getModuleFile(id: number): Observable<IRPM> {
        return this.requestFile(id)
          .pipe(
              catchError(error => {
                this.errorHandler(error);
                return of();
              })
          );
    }

    private requestFile(id: number): Observable<IRPM> {
        const headers = this.getHeaders();

        return this.http.get<IRPM>(`${this.apiUrl}/rpm/${id}`, { headers })
          .pipe(
            catchError((error) => {
              this.errorHandler(error);
              return of()
            }))
    }

    private requestModules(id: number): Observable<IModule[]> {
      const headers = this.getHeaders();

      return this.requestModuleIds(id).pipe(
          mergeMap((moduleIds: number[]) => {
              if (!Array.isArray(moduleIds)) {
                  return of([]);
              }

              const requests: Observable<IModule>[] = moduleIds.map(moduleId =>
                  this.http.get<IModule>(`${this.apiUrl}/modules/${moduleId}`, { headers })
              );
              return forkJoin(requests);
          }),
          catchError((error) => {
              this.errorHandler(error);
              return of([]);
          })
      );
    }

    private requestModuleIds(id: number): Observable<number[]> {
        const headers = this.getHeaders();
        return this.http.get<ModulesResponse>(`${this.apiUrl}/programs/${id}/modules`, { headers })
          .pipe(
              map(response => response.modules),
              catchError((error) => {
                this.errorHandler(error);
                return of([]);
              })
          )
    }

    private requestProgramDetails(id: number): Observable<IProgramDetails> {
        const headers = this.getHeaders();

        return this.http.get<IProgramDetails>(`${this.apiUrl}/programs/${id}`, { headers })
          .pipe(
              map(data => {
                  return data;
              }),
              catchError((error) => {
                  this.errorHandler(error);
                  return of();
              })
          );
    }

    private requestPrograms(): Observable<IProgram[]> {
      const headers = this.getHeaders();

      return this.http.get<IProgram[]>(`${this.apiUrl}/programs`, { headers })
          .pipe(
              map(data => {
                  return data;
              }),
              catchError((error) => {
                  this.errorHandler(error);
                  return of([]);
              })
          );
    }

    private errorHandler(error: HttpErrorResponse) {
        this._errorService.handle(error.message);
    }
}
