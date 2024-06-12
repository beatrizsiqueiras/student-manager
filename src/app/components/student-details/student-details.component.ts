import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-details',
  standalone: true,
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatRadioModule,
  ],
})
export class StudentDetailsComponent implements OnInit {
  studentId: number;
  studentDetailsForm: FormGroup;
  isEditMode: boolean = false;
  active: number = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService,
    private router: Router
  ) {
    this.studentId = 0;

    this.studentDetailsForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      cpf: [{ value: '', disabled: true }, Validators.required],
      birthdate: [{ value: '', disabled: true }],
      course: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }],
      cellphone: [{ value: '', disabled: true }],
      address: this.formBuilder.group({
        cep: [{ value: '', disabled: true }],
        logradouro: [{ value: '', disabled: true }],
        bairro: [{ value: '', disabled: true }],
        complemento: [{ value: '', disabled: true }],
        localidade: [{ value: '', disabled: true }],
        uf: [{ value: '', disabled: true }],
      }),
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.studentId = parseInt(idParam, 10);
      this.loadStudentData(this.studentId);
    }
  }

  loadStudentData(id: number): void {
    this.api.get(id).subscribe((data: Student) => {
      this.studentDetailsForm.patchValue(data);
      this.active = data.active;
    });
  }

  handleEditStudentData(value: boolean): void {
    this.isEditMode = value;
    if (value) {
      this.studentDetailsForm.enable();
    } else {
      this.studentDetailsForm.disable();
    }
  }

  onSubmit(id: number): any {
    if (!this.studentDetailsForm.valid) {
      return this.toastr.error(
        'Por favor, preencha todos os campos obrigatórios!',
        'Aviso!',
        {
          closeButton: true,
        }
      );
    }

    const formData: Student = this.studentDetailsForm.value;
    this.api.update(id, formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Dados salvos com sucesso!',
          icon: 'success',
        }).then((result) => {
          this.router.navigate(['/students']);
        });
      },
      (error) => {
        this.toastr.error(
          'Ocorreu um erro ao editar o aluno, tente novamente!',
          'Erro ao editar'
        );
      }
    );
  }
}
