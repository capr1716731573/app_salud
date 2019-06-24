import { Component } from '@angular/core';
import { SettingsService } from './services/services.index';
//utilizar jquery en angular
declare var jQuery:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  //aqui declaro los servicios para poder utilizarlo en cualquier parte del proyecto
  // en este primer caso es utilizar el servicio de ajustes para utilziar sus metodos en cualquier
  //componente de la app
  constructor( public _ajustes: SettingsService){
   
  }
}
