import { CalendarEvent } from "./calendar-event.interface";

// estructura del elemento Event
export interface Event {
    id: number;
    name: string;
    description?: string; //puede tener o no
    image: string;
    calendarEvents: CalendarEvent[];  // el evento en el calendario (array con sus propiedades)
}