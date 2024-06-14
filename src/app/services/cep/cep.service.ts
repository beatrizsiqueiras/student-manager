import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Address } from 'src/app/models/address.model';

@Injectable({
    providedIn: 'root',
})
export class CepService {
    private readonly API_URL = 'https://viacep.com.br/ws';

    constructor(private http: HttpClient) {}

    processCep(cep: string): string {
        let cleanCep = cep.replace(/\D/g, '');

        if (cleanCep.length > 8) {
            cleanCep = cleanCep.substring(0, 8);
        }

        return cleanCep;
    }

    searchCep(cep: string): Observable<Address> {
        const processedCep: string = this.processCep(cep);

        return this.http
            .get<Address>(`${this.API_URL}/${processedCep}/json`)
            .pipe(
                map((data: any) => ({
                    cep: data.cep,
                    logradouro: data.logradouro,
                    complemento: data.complemento,
                    bairro: data.bairro,
                    localidade: data.localidade,
                    uf: data.uf,
                })),
            );
    }
}
