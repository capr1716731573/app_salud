import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { TipoDiscapacidadService } from '../../services/tipo-discapacidad.service';

@Component({
  selector: 'app-tipo-discapacidad',
  templateUrl: './tipo-discapacidad.component.html',
  styles: []
})
export class TipoDiscapacidadComponent implements OnInit {

  cargando_tabla:boolean=true;
  lista:any[]=[];
 rowTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_tipdiscap:null,
    nombre_tipdiscap:null
  }
  constructor( public _service:TipoDiscapacidadService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._service.cargarDatos()
        .subscribe((datos:any)=>{
          this.lista=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_tipdiscap,
      inputPlaceholder: row.nombre_tipdiscap
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_tipdiscap=nombre;
      this._service.crud('U',row)
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
      row.pk_tipdiscap=0;
      row.nombre_tipdiscap=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this._service.crud('I',row)
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
          this._service.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }
}

  