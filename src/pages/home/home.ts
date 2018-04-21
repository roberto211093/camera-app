import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';//Importamos la camara, CameraOptions es para poder elejir entre foto o video

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: string = null;

  constructor(
    public navCtrl: NavController,
    private camera: Camera//lo inyectamos
  ) {

  }

  takePhoto() {
    //Creo una conts con las opciones
    const options: CameraOptions = {
      quality: 100,//quality, calidad va de 0 a 100
      destinationType: this.camera.DestinationType.FILE_URI,//destinationType, formato en el q va a retornar el valor FILE_URI por defecto
      allowEdit: true,//allowEdit permite editar la foto
      correctOrientation: true,//correctOrientation, corrige la orientacion de la foto
      sourceType: this.camera.PictureSourceType.CAMERA//sourceType, de donde yo quiero q capture la foto
    };
    //hacemos referencia a nuestro provider camara y le decimos getPicture(options)
    this.camera.getPicture(options)
    .then(image => {//Usamos .then porque getPicture(options) nos devuelve una promesa
      console.log('image', image);
      this.image = image;//
    })
    .catch(error => console.log(error));//Hacemos un catch por si hay un error
  }

  goToMapPage() {
    this.navCtrl.push('MapPage');
  }

}
