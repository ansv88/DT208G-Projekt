import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class MyScheduleService {
  private storageKey = 'mySchedule'; //Nyckel för lagring av ramschemat i localStorage

  constructor() {}

  //Hämta alla kurser från ramschemat som är lagrat i localStorage
  getCourses(): Course[] {
    let courses = localStorage.getItem(this.storageKey); //Hämta kurser från localStorage
    return courses ? JSON.parse(courses) : []; //Om kurser finns, parsa JSON-strängen till en array, annars returnera en tom array
  }

  //Lägg till en kurs till ramschemat och spara i localStorage
  addCourse(course: Course): void {
    const courses = this.getCourses(); //Hämta aktuell lista med kurser
    courses.push(course); //Lägg till den nya kursen i listan
    localStorage.setItem(this.storageKey, JSON.stringify(courses)); //Spara den uppdaterade listan i localStorage
  }

  //Ta bort en kurs från ramschemat baserat på kurskod och uppdatera localStorage
  removeCourse(courseCode: string): void {
    let courses = this.getCourses(); //Hämta aktuell lista med kurser
    courses = courses.filter((c) => c.courseCode !== courseCode); //Filtrerar bort kursen som ska tas bort
    localStorage.setItem(this.storageKey, JSON.stringify(courses)); //Spara den uppdaterade listan i localStorage
  }

  //Rensa hela ramschemat från localStorage genom att ta bort nyckeln
  clearSchedule(): void {
    localStorage.removeItem(this.storageKey);
  }
}
