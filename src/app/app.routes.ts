import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { MyScheduleComponent } from './pages/my-schedule/my-schedule.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent, title:"Dalsjöns Universitet" },
    { path: "courses", component: CoursesComponent, title:"DU - kurser" },
    { path: "my-schedule", component: MyScheduleComponent, title:"DU - ramschema" },
    { path: "", redirectTo: "home", pathMatch: "full" },
    {path: '404', component: NotFoundComponent, title:"DU - 404"},
    {path: '**', component: NotFoundComponent},
];
