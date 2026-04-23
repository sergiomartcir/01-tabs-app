import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonImg, IonText, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CalendarComponent } from "src/app/shared/components/calendar/calendar.component";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonBackButton, IonImg, IonText, CalendarComponent, IonButtons]
})
export class EventDetailPage {

  private router = inject(Router);  // servicio de enrutación

  public eventDetail: any = null;  //variable para almacenar el Event recibido de la otra page

  constructor() { 
    // recuperamos los datos de la page anterior
    const navigation = this.router.currentNavigation();

    if (navigation?.extras.state) {
      this.eventDetail = navigation.extras.state['event'];
    }
  }

}
