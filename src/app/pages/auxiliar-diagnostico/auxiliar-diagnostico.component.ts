import { Component, OnInit } from '@angular/core';
import { AuxiliarDiagnosticoService } from '../../services/auxiliar-diagnostico.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-auxiliar-diagnostico',
  templateUrl: './auxiliar-diagnostico.component.html',
  styles: []
})
export class AuxiliarDiagnosticoComponent implements OnInit {

  cargando_tabla:boolean=true;
  listaAuxiliarDiagnostico:any[]=[];
 AuxiliarDiagnosticoTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_auxdiag:null,
    nombre_auxdiag:null
  }
  constructor( public _auxiliarDiagnosticoService:AuxiliarDiagnosticoService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._auxiliarDiagnosticoService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaAuxiliarDiagnostico=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_auxdiag,
      inputPlaceholder: row.nombre_auxdiag
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_auxdiag=nombre;
      this._auxiliarDiagnosticoService.crud('U',row)
            .subscribe((resp:any) => {
              this.cargarAll();
              swal.fire(`Registro Actualizado!!`)
            });
            
      }else{
        swal.fire(`Falta dato, registro no actualizado!!`)
      }
    }

    async insertar(){
      const row:any={};
      const {value: nombre} = await swal.fire({
      title: 'Ingrese nuevo registro',
      input: 'text',
      inputPlaceholder: 'Ingrese Aqui.'
    })
    
    if (nombre && nombre.length > 0) {
      row.pk_auxdiag=0;
      row.nombre_auxdiag=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this._auxiliarDiagnosticoService.crud('I',row)
            .subscribe((resp:any) => {
              this.cargarAll();
              swal.fire(`Registro Ingresado!!`)
            });
            
      }else{
        swal.fire(`Falta dato, registro no ingresado!!`)
      }
      
  }

    eliminar(row:any){
      swal.fire({
        title: 'Confirmación',
        text: "Desea eliminar este registro?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.value) {
          this._auxiliarDiagnosticoService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }
}
