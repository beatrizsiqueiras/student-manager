import { Address } from './address.model';

export interface Student {
  name: string;
  cpf: string;
  birthdate: string;
  course: string;
  email: string;
  cellphone: string;
  address: Address;
}
