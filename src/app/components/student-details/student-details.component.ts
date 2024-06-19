import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
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
        FormsModule,
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
        private router: Router,
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
            deletedAt: '',
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
                },
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
                    'Erro ao editar',
                );
            },
        );
    }

    onStatusChange(newStatus: any) {
        const status = parseInt(newStatus);
        this.changeStudentStatus(this.studentId, status);
    }

    changeStudentStatus(id: number, newStatus: number) {
        this.api.get(id).subscribe(
            (student: Student) => {
                const studentData: Student = {
                    ...student,
                    active: newStatus,
                };

                this.api.update(id, studentData).subscribe(
                    (response) => {
                        this.active = newStatus;
                        this.toastr.success(
                            `Aluno ${newStatus == 1 ? 'ativado' : 'desativado'}`,
                        );
                    },
                    (error) => {
                        this.toastr.error('Erro ao alterar o status do aluno!');
                    },
                );
            },
            (error) => {
                this.toastr.error('Erro ao carregar os dados do aluno!');
            },
        );
    }

    onDelete(id: number): any {
        Swal.fire({
            title: 'Deseja deletar esse aluno?',
            text: 'Não será possível reverter esta ação!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.deleteStudent(id)) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        icon: 'success',
                    });
                }
            }
        });
    }

    deleteStudent(id: number): any {
        this.api.get(id).subscribe(
            (student: Student) => {
                const studentData: Student = {
                    ...student,
                    deletedAt: new Date().toISOString(),
                };

                this.api.update(id, studentData).subscribe(
                    (response) => {
                        return true;
                    },
                    (error) => {
                        return false;
                    },
                );
            },
            (error) => {
                return false;
            },
        );
    }
}
