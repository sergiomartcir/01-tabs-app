import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, AlertController, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonFab, IonFabButton, IonIcon, IonRouterLink } from '@ionic/angular/standalone';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { Event } from 'src/app/interfaces/event.interface';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonFab, IonFabButton, IonIcon]
})
export class Tab2Page {

  // inyección del servicio y el controlador de alertas para los pop-ups
  private eventService = inject(EventService);
  private alertController = inject(AlertController)
  private router = inject(Router);  // servicio de enrutación

  // obtenemos los eventos obtenidos de la señal del servicio
  public listEvents = this.eventService.events;

  constructor() {
    addIcons({ 
      addOutline 
    });
  }

  goToForm() {
    this.router.navigate(['/event-form']);
  }

  // método para mostrar el mensaje al producirse el evento click
  async showMessage(event: Event) {
    const alert = await this.alertController.create({
      header: `Has seleccionado el evento "${event.name}"`,
      buttons: [
        {
          // botón de cancelar
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          // botón de continuar a la página de detalles
          text: 'Detalles',
          handler: () => {   // función que se ejecuta al presionar el botón
            this.router.navigate(
              ['./event-detail'],
              {
                // pasamos a la page de detalles el objeto Event con sus datos
                state: {event}
              }
            );
          }
        }
      ]
    });

    //dibuja el diálogo en la interfaz
    await alert.present();
  }
}
