import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  //referencia a elementos html a traves de darle nombres como variables con #nombreVariable en el ejm #txtProgress
  @ViewChild('txtProgress',{ read: true, static: false }) txtProgress:ElementRef;

  //NOTA EN EL HTML VA A COGER CON EL NOMBRE DE atributoleyenda PERO EN EL CODIGO SE MANEJA COMO leyenda
  //PERO SOLO EN LOS ATRIBUTOS OSEA DENTRO DE UNA TAG HTML CUANDO ES CON {{ }} AHI SI VA EL NOMBRE DE leyenda COMO ESTA EN EL CONTROLADOR
  @Input('atributoleyenda') leyenda:string='Leyenda';
  @Input() atributoprogreso:number=50;

  @Output() metIncrementadorCambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('leyenda', this.leyenda);
    console.log('progreso', this.atributoprogreso); 
   }

  ngOnInit() {
  }

  cuandoCambiaModel( newValue:number){
    //let elementHTML= document.getElementsByName('progreso')[0];

    if(newValue >= 100){
      this.atributoprogreso=100;
    }else if (newValue <= 0){
      this.atributoprogreso=0;
    }else{
      this.atributoprogreso=newValue;
    }

    this.txtProgress.nativeElement.value=Number(this.atributoprogreso);

    //AQUI SE CAMBIA EL VALOR CUANDO SE CONCATENA CON EL OUTPUT
    this.metIncrementadorCambioValor.emit(this.atributoprogreso);
  }

  cambiarValor(valor){
    
    if (this.atributoprogreso > 100) {
        this.atributoprogreso = 100;
    } else if (this.atributoprogreso < 0) {
        this.atributoprogreso = 0;
    }
    
    this.atributoprogreso += valor;

    //AQUI SE CAMBIA EL VALOR CUANDO SE CONCATENA CON EL OUTPUT
    this.metIncrementadorCambioValor.emit(this.atributoprogreso);
    this.txtProgress.nativeElement.focus();
  }
}
