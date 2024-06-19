import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from 'src/app/models/student.model';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    baseUrl: string = 'http://localhost:3000/students';

    constructor(private http: HttpClient) {}

    get(studentId?: number): Observable<any> {
        let params = new HttpParams();

        const url = studentId ? `${this.baseUrl}/${studentId}` : this.baseUrl;

        params = params.append('deletedAt_ne', '');

        return this.http
            .get<any[]>(url, { params })
            .pipe(catchError(this.handleError));
    }

    create(studentData: Student): Observable<any> {
        const newStudentData = { ...studentData, id: this.generateRandomId() };
        return this.http
            .post(this.baseUrl, newStudentData)
            .pipe(catchError(this.handleError));
    }

    update(studentId: number, studentData: Student): Observable<any> {
        const url = `${this.baseUrl}/${studentId}`;
        return this.http
            .put(url, studentData)
            .pipe(catchError(this.handleError));
    }

    delete(studentId: number): Observable<any> {
        const url = `${this.baseUrl}/${studentId}`;
        return this.http.delete(url).pipe(catchError(this.handleError));
    }

    private generateRandomId(): number {
        return Math.floor(Math.random() * 1000000);
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
