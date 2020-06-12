import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from 'src/app/services/places.service';
import { IPlaces } from 'src/app/interfaces/iplaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  place: IPlaces;
  isLoading = false;
  loadedPlaces: IPlaces[] = [];
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

  edit(){
    this.router.navigate(['/places/edit/' + this.place.id]);
  }

  deletePlace(id) {
    this.presentAlertConfirm(id);
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertCtrl.create({
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
                this.router.navigate(['/places']);
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