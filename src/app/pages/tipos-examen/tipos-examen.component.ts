import { Component, OnInit } from '@angular/core';
import { TipoExamenService } from '../../services/tipo-examen.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-examen',
  templateUrl: './tipos-examen.component.html',
  styles: []
})
export class TiposExamenComponent implements OnInit {

  cargando_tabla:boolean=true;
  listaTipoExamen:any[]=[];
 tipoExamenTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_tipexa:null,
    nombre_tipexa:null
  }
  constructor( public _tipoExamenService:TipoExamenService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._tipoExamenService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaTipoExamen=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_tipexa,
      inputPlaceholder: row.nombre_tipexa
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_tipexa=nombre;
      this._tipoExamenService.crud('U',row)
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
      row.pk_tipexa=0;
      row.nombre_tipexa=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this._tipoExamenService.crud('I',row)
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
          this._tipoExamenService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }
}
