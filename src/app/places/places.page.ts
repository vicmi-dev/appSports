import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IPlaces } from '../interfaces/iplaces';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {
  loadedPlaces: IPlaces[] = [];
  firstElement: IPlaces = {
    id: '',
    title: '',
    image_url: '',
    descripcion: '',
    available_to: '',
    available_from: '',
    user_num: '',
    price: ''
  };


  constructor(private placesService: PlacesService, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.placesService.obtenerSitios().subscribe((resp: any) => {
      console.log(resp);
      this.loadedPlaces.push(resp);
      this.loadedPlaces = resp;
      this.firstElement = this.loadedPlaces[0];
    });
  }

  deleteCliente(id) {
    this.presentAlertConfirm(id);

  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: '¿Quiere eliminar este sitio?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Aceptar');
            this.placesService.deleteSitio(id).subscribe(() => {
              this.placesService.obtenerSitios().subscribe((resp: any) => {
                this.loadedPlaces = resp;
              });
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('No se ha realizado ningún cambio');
          }
        }
      ]
    });

    await alert.present();
  }
}
