import { Component, OnInit } from '@angular/core';
import { MyScheduleService } from '../../services/my-schedule.service';
import { Course } from '../../models/course';
import { CommonModule, ViewportScroller } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-my-schedule',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './my-schedule.component.html',
  styleUrl: './my-schedule.component.css'
})
export class MyScheduleComponent implements OnInit {
  //Variabler
  myCourses: Course[] = []; //Array som sedan ska ta hand om kurserna i ramschemat
  totalPoints: number = 0; //Variabel för totala kurspoängen

  constructor(private myScheduleService: MyScheduleService, private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);  //Vid navigering till sidan, navigera till toppen
    this.loadCourses(); //Laddar kurserna när sidan(komponenten) laddas
  }

  loadCourses(): void {
    this.myCourses = this.myScheduleService.getCourses(); //Hämtar kurserna från servicen (där localStorage hanteras)
    this.calculateTotalPoints(); //Beräknar totalpoängen för kurserna
  }

  removeCourse(courseCode: string): void {
    this.myScheduleService.removeCourse(courseCode); //Anropar servicen för att ta bort en kurs
    this.loadCourses(); //Uppdaterar kurslistan och totalpoängen med metoden ovan
  }

  clearSchedule(): void {
    this.myScheduleService.clearSchedule(); //Anropar servicen för att rensa ramschemat
    this.loadCourses();
  }

  //Beräkna totala poängen på kurser i ramschemat
  calculateTotalPoints(): void {
    this.totalPoints = this.myCourses.reduce((sum, course) => sum + course.points, 0);
  }
}