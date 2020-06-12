import { Component, OnInit } from '@angular/core';
import { IPlaces } from 'src/app/interfaces/iplaces';
import { Router, ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/services/places.service';
import { AlertController, NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  place: IPlaces = {
    id: '',
    title: '',
    image_url: '',
    descripcion: '',
    available_to: '',
    available_from: '',
    user_num: '',
    price: ''
  };
  isLoading = false;

  private placeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places');
        return;
      }
      this.isLoading = true;
      this.placeSub = this.placesService
        .obtenerSitio(paramMap.get('placeId'))
        .subscribe(
          place => {
            this.place = place;
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error ocurred!',
                message: 'Could not load place.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/places']);
                    }
                  }
                ]
              })
              .then(alertEl => alertEl.present());
          }
        );
    });
  }

  actualizarCliente() {
    this.placesService.actualizarSitio(this.place).subscribe((resp: any) => {
      this.presentAlertConfirm();
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Sitio actualizado correctamente!!!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Aceptar');
            this.router.navigate(['/places']);
          }
        }
      ]
    });

    await alert.present();
  }
}