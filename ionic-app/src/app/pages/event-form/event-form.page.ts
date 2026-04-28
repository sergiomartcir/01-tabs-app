import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonInput, IonTextarea, IonImg, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonInput, IonTextarea, IonImg, IonButton, IonIcon]
})
export class EventFormPage {

  private router = inject(Router);
  private eventService = inject(EventService);
  private cdr = inject(ChangeDetectorRef);

  public updateMode: boolean = false;  // variable para saber si estamos en modo update o create
  /* 
    estructura del event vacío para llenarlo con una copia de los datos 
    y no modificarlo directamente
  */
  public eventData: any = {
    // sin id porque es inmutable y es asignado por la api
    name: '',
    description: '',
    image: '',
    calendarEvents: []
  };

  constructor() { 
    addIcons({ 
      addOutline, 
      trashOutline
    });

    // recuperamos los datos de la page anterior
    const navigation = this.router.currentNavigation();

    // si la navegación existe y tiene un evento, se pone en modo edición
    if (navigation?.extras.state && navigation.extras.state['event']) {
      this.updateMode = true;

      // guardamos en la copia los datos del event original
      this.eventData = JSON.parse(JSON.stringify(navigation.extras.state['event']));
    }
  }
  
  // lógica de los hitos del calendario
  addCalendarEvent() {
    if (!this.eventData.calendarEvents) {
      this.eventData.calendarEvents = [];
    }
    
    // Añadimos el hito de forma normal
    this.eventData.calendarEvents.push({ date: '', title: '', color: '#000000' });
    
    // forzamos a que se dibuje (por bugs ocurridos)
    this.cdr.detectChanges();
  }

  removeCalendarEvent(index: number) {
    // Borramos el hito
    this.eventData.calendarEvents.splice(index, 1);
    
    // forzamos a que se dibuje (por bugs ocurridos)
    this.cdr.detectChanges();
  }

  //método que se ejecuta al pulsar Guardar
  async saveEvent() {
    if (this.updateMode) {
      await this.eventService.update(this.eventData.id, this.eventData);
    } else {
      await this.eventService.create(this.eventData);
    }

    // Al terminar, te redirecciona a la lista principal
    this.router.navigate(['/tabs/tab2']);
  }

}
