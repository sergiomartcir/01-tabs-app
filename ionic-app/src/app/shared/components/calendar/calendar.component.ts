import { Component, computed, input } from '@angular/core';
import { IonDatetime } from "@ionic/angular/standalone";
import { CalendarEvent } from 'src/app/interfaces/calendar-event.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [IonDatetime],
})
export class CalendarComponent {
  // Input Signal que recibe los eventos para el  calendario
  calendarEvents = input<CalendarEvent[]>([]);

  highlightedDates = computed(() => {
    return this.calendarEvents().map(event => ({
      // obtenemos los datos necesarios de event para el calendario
      date: event.date,
      textColor: event.color
    }));
  });

}
