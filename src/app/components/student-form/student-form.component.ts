import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CepService } from 'src/app/services/cep/cep.service';
import { Address } from 'src/app/models/address.model';
import { ApiService } from 'src/app/services/api/api.service';
import { Student } from 'src/app/models/student.model';
import { Router } from '@angular/router';

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
    private toastr: ToastrService,
    private api: ApiService,
	private router: Router
  ) {
    this.registrationStudentForm = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      birthdate: [''],
      course: ['', Validators.required],
      email: [''],
      cellphone: [''],
      address: this.formBuilder.group({
        cep: [''],
        logradouro: [''],
        complemento: [''],
        bairro: [''],
        localidade: [''],
        uf: [''],
      }),
    });
  }

  ngOnInit(): void {
    this.registrationStudentForm
      .get('address.cep')
      ?.valueChanges.subscribe((value) => {
        if (this.registrationStudentForm.get('address.cep')?.valid) {
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
      address: {
        logradouro: address.logradouro,
        bairro: address.bairro,
        localidade: address.localidade,
        uf: address.uf,
      },
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

    const formData: Student = this.registrationStudentForm.value;
    const send = this.api.create(formData).subscribe(
      (success) => {
        Swal.fire({
          title: 'Aluno cadastrado com sucesso!',
          icon: 'success',
        }).then((result) => {
          this.router.navigate(['/']);
        });
      },
      (error) => {
        this.toastr.error(
          'Ocorreu um erro ao cadastrar o usuário, tente novamente',
          'Erro ao cadastrar'
        );
      }
    );
  }
}
