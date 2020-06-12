import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/services/places.service';
import { IPlaces } from 'src/app/interfaces/iplaces';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  place: IPlaces = {
    id: '',
    title: '',
    image_url: '',
    descripcion: '',
    available_to: new Date(),
    available_from: new Date(),
    user_num: '',
    price: 0
  };

  constructor(private placesService: PlacesService , private alertController: AlertController, private route: Router) {
  }

  ngOnInit() {
  }

  enviarSitio() {
      this.placesService.enviarSitio(this.place).subscribe((resp: any) => {
        this.presentAlertConfirm();
      });
    }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Instalación añadida',
      message: 'Gracias por añadir una nueva instalación deportiva',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Aceptar');
            this.route.navigate(['/places']);
          }
        }
      ]
    });

    await alert.present();
  }

}