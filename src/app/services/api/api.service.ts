import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  get(studentId?: number): Observable<any> {
    const url = studentId ? `${this.baseUrl}/${studentId}` : this.baseUrl;
    return this.http.get(url);
  }

  create(studentData: any): Observable<any> {
    return this.http.post(this.baseUrl, studentData);
  }

  update(studentId: number, studentData: any): Observable<any> {
    const url = `${this.baseUrl}/${studentId}`;
    return this.http.put(url, studentData);
  }

  delete(studentId: number): Observable<any> {
    const url = `${this.baseUrl}/${studentId}`;
    return this.http.delete(url);
  }
}
