import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from 'src/app/models/address.model';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private readonly API_URL = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  searchCep(cep: string): Observable<Address> {
    return this.http.get<Address>(`${this.API_URL}/${cep}/json`).pipe(
      map((data) => ({
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      }))
    );
  }
}
