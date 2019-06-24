import { Component, OnInit } from '@angular/core';

//DECLARAR UNA FUNCION DE UNARCHIVO JQUERY EN OTR ARCHIVO
declare function init_plugins();

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styles: []
})
export class PaginasComponent implements OnInit {

  constructor() { 
    //FUNCION DE ARCHIVO JQUERY QUE BRINDA EFECTOS EN EL DASHBOARD
    init_plugins();
  }

  ngOnInit() {
  }

}
