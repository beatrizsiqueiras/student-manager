import { Address } from './address.model';

export interface Student {
    id: number;
    name: string;
    cpf: string;
    birthdate: string;
    course: string;
    email: string;
    cellphone: string;
    address: Address;
    active: number;
    deletedAt?: string;
}
