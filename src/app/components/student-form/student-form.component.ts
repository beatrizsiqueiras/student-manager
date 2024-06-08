import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CepService } from 'src/app/services/cep/cep.service';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  registrationStudentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private toastr: ToastrService
  ) {
    this.registrationStudentForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      houseNumber: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.registrationStudentForm.get('cep')?.valueChanges.subscribe((value) => {
      if (this.registrationStudentForm.get('cep')?.valid) {
        this.searchAddress(value);
      }
    });
  }

  searchAddress(cep: string): any {
    this.cepService.searchCep(cep).subscribe(
      (data: Address) => {
        this.fillAddress(data);
      },
      (error) => {
        this.toastr.warning(
          'Por favor, preencha os campos manualmente',
          'CEP não encontrado'
        );
      }
    );
  }

  fillAddress(address: Address): void {
    this.registrationStudentForm.patchValue({
      street: address.logradouro,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
    });
  }

  onSubmit(): any {
    if (!this.registrationStudentForm.valid) {
      return this.toastr.error(
        'Por favor, preencha todos os campos obrigatórios!',
        'Aviso!',
        {
          closeButton: true,
        }
      );
    }
  }
}
