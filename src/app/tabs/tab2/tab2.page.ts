import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, AlertController, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { EventService } from '../../services/events.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class Tab2Page {

  // inyección del servicio y el controlador de alertas para los pop-ups
  private eventService = inject(EventService);
  private alertController = inject(AlertController)

  // obtenemos los eventos obtenidos de la señal del servicio
  public listEvents = this.eventService.events;

  // método para mostrar el mensaje al producirse el evento click
  async showMessage(eventName: string) {
    const alert = await this.alertController.create({
      header: `Has seleccionado el evento "${eventName}"`,
      buttons: ['Continuar']
    });

    //dibuja el diálogo en la interfaz
    await alert.present();
  }
}
