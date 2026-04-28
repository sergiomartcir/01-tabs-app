import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonImg, IonText, IonButtons, IonFab, IonFabButton, IonIcon, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CalendarComponent } from "src/app/shared/components/calendar/calendar.component";
import { EventService } from '../../services/event.service';
import { addIcons } from 'ionicons';
import { pencilOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonBackButton, IonImg, IonText, CalendarComponent, IonButtons, IonFab, IonFabButton, IonIcon]
})
export class EventDetailPage {

  private router = inject(Router);  // servicio de enrutación
  private alertController = inject(AlertController);
  private eventService = inject(EventService);

  public eventDetail: any = null;  //variable para almacenar el Event recibido de la otra page

  constructor() { 
    addIcons({ 
      pencilOutline, 
      trashOutline
    });

    // recuperamos los datos de la page anterior
    const navigation = this.router.currentNavigation();

    if (navigation?.extras.state) {
      this.eventDetail = navigation.extras.state['event'];
    }
  }

  // método para editar los eventos al darle al botón
  editEvent() {
    // navega al form de añadir un evento, pero lo rellena con sus datos
    this.router.navigate(['/event-form'], { 
      state: { 
        event: this.eventDetail 
      } 
    });
  }

  // método para el botón de eliminar evento
  async confirmDelete() {
    const alert = await this.alertController.create ({
      header: `¿Estás seguro de que quieres eliminar "${this.eventDetail.name}"?`,
      message: 'Esta acción no se puede deshacer',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            // llama a la api para borrarlo
            await this.eventService.delete(this.eventDetail.id);
            
            // Vuelve a la lista principal
            this.router.navigate(['/tabs/tab2']);
          }
        }
      ]
    });

    await alert.present();
  }

}
