import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-cuenta-configuraciones',
  templateUrl: './cuenta-configuraciones.component.html',
  styles: []
})
export class CuentaConfiguracionesComponent implements OnInit {

  //constructor( @Inject(DOCUMENT) private _document) { }
  //con esta linea tengo acceso a todo el documento o el DOM
  constructor( public _ajustes: SettingsService) {             
                }

  ngOnInit() {
    this.colorcarCheck();
  }

  cambiarColor( tema:string, link:any){
    console.log("Tema seleccionado: ");
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
    
  }

  aplicarCheck(link:any){
    let _selectores: any= document.getElementsByClassName('selector');

    //ago barrido y borro clase working de todos lo selectores
    for (let ref of _selectores){
      ref.classList.remove('working');
    }
    //pongo la clase working en el selector seleccionado
    link.classList.add('working');

  }

  colorcarCheck(){
    let _selectores: any= document.getElementsByClassName('selector');
    let tema=this._ajustes.ajustes.tema;

    for(let ref of _selectores){
      //con getAttribute('data-theme') obtengo cualquier atributo del html, sea propio o de angular
      if(ref.getAttribute('data-theme') === tema){
       ref.classList.add('working');
      }
    }
  }

}
