import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-list',
  styleUrls: ['student-list.component.css'],
  templateUrl: 'student-list.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
})
export class StudentListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'course', 'actions'];
  studentData: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private toastr: ToastrService, private api: ApiService) {
    this.studentData = new MatTableDataSource();
  }

  ngOnInit() {
    this.api.get().subscribe({
      next: (students: Student[]) => {
        this.studentData.data = students;
      },
      error: (err: any) => {
        this.toastr.error('Erro ao carregar os alunos.');
      },
    });
  }

  ngAfterViewInit() {
    this.studentData.paginator = this.paginator;
    this.studentData.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.studentData.filter = filterValue.trim().toLowerCase();

    if (this.studentData.paginator) {
      this.studentData.paginator.firstPage();
    }
  }

  toggleActive(id: string) {
    // @ts-ignore
    const student = this.studentData.data.find((s) => s.id === id);
    if (student) {
      // @ts-ignore
      student.active = !student.active;
      this.toastr.success(
        `Student ${student.active ? 'activated' : 'deactivated'}`
      );
    }
  }

  editStudent(id: string) {
    this.toastr.info(`Edit student with id ${id}`);
  }
}