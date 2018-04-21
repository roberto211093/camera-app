import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    const loading = this.loadCtrl.create();
    loading.present();

    this.geolocation.getCurrentPosition({
      timeout: 5000,
      enableHighAccuracy: true
    })
    .then(position => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      loading.dismiss();
      this.loadMap(position.coords.latitude, position.coords.longitude );
    });
  }

  loadMap(latitude: number, longitude: number) {
    let mapEle: HTMLElement = document.getElementById('map');

    this.map = new google.maps.Map(mapEle, {
      center: {
        lat: latitude,
        lng: longitude
      },
      zoom: 18
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      const marker = new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude
        },
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }

}
