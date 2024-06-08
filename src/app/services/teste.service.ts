import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TesteService {
    constructor() {}

    adicionar() {
        console.log('Teste adicionado!')
    }
}