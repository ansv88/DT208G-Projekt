import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { MyScheduleComponent } from './pages/my-schedule/my-schedule.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent, title:"Dalsjöns Universitet" },
    { path: "courses", component: CoursesComponent, title:"Dalsjöns Universitet | Kurser" },
    { path: "my-schedule", component: MyScheduleComponent, title:"Dalsjöns Universitet | Ramschema" },
    { path: "", redirectTo: "home", pathMatch: "full" },
    {path: '404', component: NotFoundComponent, title:"Dalsjöns Universitet | 404"},
    {path: '**', component: NotFoundComponent},
];
