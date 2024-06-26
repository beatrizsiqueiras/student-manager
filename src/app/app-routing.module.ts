import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register-student', component: StudentFormComponent },
    { path: 'students', component: StudentListComponent },
    { path: 'student/:id', component: StudentDetailsComponent },
    { path: 'about', component: AboutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
