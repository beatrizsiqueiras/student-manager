import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  get(studentId?: number): Observable<any> {
    const url = studentId ? `${this.baseUrl}/${studentId}` : this.baseUrl;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  create(studentData: any): Observable<any> {
    return this.http
      .post(this.baseUrl, studentData)
      .pipe(catchError(this.handleError));
  }

  update(studentId: number, studentData: any): Observable<any> {
    const url = `${this.baseUrl}/${studentId}`;
    return this.http.put(url, studentData).pipe(catchError(this.handleError));
  }

  delete(studentId: number): Observable<any> {
    const url = `${this.baseUrl}/${studentId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
