import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // para poder conectar con la api
import { Event } from '../interfaces/event.interface';
import { firstValueFrom } from 'rxjs';  //perimite usar async/await

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private http = inject(HttpClient);
    private readonly API_URL = 'http://localhost:3000/api/events';

    // Señal que usará la app para mostrar la lista
    private _events = signal<Event[]>([]);
    
    public events = this._events.asReadonly();

    constructor() {
        this.getAll();  // Cargamos datos al iniciar
    }

    // 1. READ ALL
    async getAll() {
        const data = await firstValueFrom(this.http.get<Event[]>(this.API_URL));
        
        this._events.set(data);
    }

    // 2. READ ONE
    async getById(id: number): Promise<Event> {
        return await firstValueFrom(this.http.get<Event>(`${this.API_URL}/${id}`));
    }

    // 3. CREATE
    async create(event: Omit<Event, 'id'>) {
        await firstValueFrom(this.http.post<Event>(this.API_URL, event));
        
        await this.getAll();    //Refresca la lista local
    }

    // 4. UPDATE
    async update(id: number, event: Partial<Event>) {
        await firstValueFrom(this.http.put<Event>(`${this.API_URL}/${id}`, event));
        
        await this.getAll();
    }

    // 5. DELETE
    async delete(id: number) {
        await firstValueFrom(this.http.delete(`${this.API_URL}/${id}`));
        
        await this.getAll();
    }
    
}