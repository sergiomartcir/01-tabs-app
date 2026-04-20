/*
    Servicio que se encarga de crear una señal con un array de eventos y retornarlos en modo lectura
*/

import { Injectable, signal } from '@angular/core';
import { Event } from '../interfaces/events.interface';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    // se crea una señal para contener los elementos del array
    private _events = signal<Event[]>([
        {id: 1, name: 'Torneo de ping-pong'},
        {id: 2, name: 'Merienda en la cafetería', description: 'Comida gratis para todos'},
        {id: 3, name: 'Charla informativa'},
        {id: 4, name: 'Reunión de proyecto', description: 'Reunión para comprobar progresos'},
        {id: 5, name: 'Visita de alumnos', description: 'Visita de alumnos de un instituto a las oficinas'}
    ]);

    // retorna la señal como "solo lectura" porque no es necesario modificarla
    get events() {
        return this._events.asReadonly();
    }
}