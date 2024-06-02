import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MyScheduleService } from '../../services/my-schedule.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    RouterLink,
    RouterLinkActive,
    DropdownModule
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  //Variabler
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  filterValue: string = '';
  subjects: string[] = [];
  selectedSubject: string = '';
  subjectOptions: any[] = [];
  sortColumn: keyof Course | null = null; //Ingen initial sortering
  sortAscending: boolean = true; //Default sorteringsordning
  addedCourses: Set<string> = new Set<string>(); //Set för att hålla reda på tillagda kurser
  first = 0; //För pagineringen
  rows = 10; //För pagineringen

  //Definierar alternativ för sortering (mobilvy)
  sortOptions = [
    { label: 'Välj sortering', value: 'courseCode-asc'},
    { label: 'Kurskod stigande', value: 'courseCode-asc' },
    { label: 'Kurskod fallande', value: 'courseCode-desc' },
    { label: 'Kursnamn stigande', value: 'courseName-asc' },
    { label: 'Kursnamn fallande', value: 'courseName-desc' },
    { label: 'Poäng stigande', value: 'points-asc' },
    { label: 'Poäng fallande', value: 'points-desc' },
  ];
  selectedSortOption: any | null = this.sortOptions[0].value;

  //Injekterar CoursesService och MyScheduleService för att hämta kursdata, hantera ramschemat och scroll till toppen vid nav
  constructor(
    private coursesService: CoursesService,
    private myScheduleService: MyScheduleService,
    private viewportScroller: ViewportScroller
  ) {}

  //Initierar komponenten och hämtar kurser
  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]); //Vid navigering till sidan, navigera till toppen

    this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;

      //Skapar en lista över unika ämnen
      this.subjects = Array.from(
        new Set(courses.map((course) => course.subject))
      );

      this.subjectOptions = [{ label: 'Alla ämnen', value: '' }, ...this.subjects.map((subject) => ({  //Lägger till "Alla ämnen" som ett återställningsval i dropdownen
        label: subject,
        value: subject,
      }))];
      this.selectedSubject = ''; //Se till att "Alla ämnen" är valt som standard

      //Ladda tillagda kurser från MyScheduleService
      const addedCourses = this.myScheduleService.getCourses();
      addedCourses.forEach((course) =>
        this.addedCourses.add(course.courseCode)
      );
    });
  }

  //Filtrera kurser baserat på sökord och valt ämne
  filterCourses(): void {
    const filterValueLower = this.filterValue.toLowerCase();
    this.filteredCourses = this.courses.filter(
      (course) =>
        (course.courseCode.toLowerCase().includes(filterValueLower) ||
          course.courseName.toLowerCase().includes(filterValueLower)) &&
          (this.selectedSubject === '' || course.subject === this.selectedSubject)
    );
    this.applySort(); //Använd sortering efter filtrering
    this.first = 0; //Återställ paginering till första sidan
  }

  //Lägg till kurs i ramschemat
  addCourse(course: Course): void {
    if (!this.isCourseAdded(course.courseCode)) { //Kontrollera om kursen redan är tillagd
      this.myScheduleService.addCourse(course); //Använd MyScheduleService för att lägga till kurs
      this.addedCourses.add(course.courseCode); //Lägg till kurskoden(id:et) till setet av tillagda kurser
    }
  }

  //Kontrollera om en kurs har lagts till
  isCourseAdded(courseCode: string): boolean {
    return this.addedCourses.has(courseCode);
  }

  //Hantera sidbyte i paginering
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  //Hantera sorteringsändring från dropdown
  sortCourses(sortOption: string | null): void {
    this.selectedSortOption = sortOption;
    this.applySort(); //Använd den nya sorteringen
  }

  //Applicera sorteringen baserat på valt sorteringsalternativ
  applySort(): void {
    if (this.selectedSortOption === null || !this.selectedSortOption) {
      this.filteredCourses = this.filteredCourses.slice(); //Kopierar den aktuella filtreringen utan att påverka originaldatan
      return;
    }

    //Extrahera kolumn och ordning från sorteringsalternativet
    const [column, order] = this.selectedSortOption.split('-');
    const isAscending = order === 'asc';

    //Sortera kurserna baserat på vald kolumn och ordning
    this.filteredCourses.sort((a, b) => {
      let fieldA = a[column as keyof Course];
      let fieldB = b[column as keyof Course];

      if (typeof fieldA === 'string') {
        fieldA = fieldA.toLowerCase();
      }
      if (typeof fieldB === 'string') {
        fieldB = fieldB.toLowerCase();
      }

      if (fieldA < fieldB) {
        return isAscending ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });
  }
}
