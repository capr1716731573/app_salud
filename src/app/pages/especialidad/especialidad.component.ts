import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../services/especialidad.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styles: []
})
export class EspecialidadComponent implements OnInit {

  cargando_tabla:boolean=true;
  listaEspecialidad:any[]=[];
 especialidadTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_espec:null,
    nombre_espec:null
  }
  constructor( public _especialidadService:EspecialidadService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._especialidadService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaEspecialidad=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_espec,
      inputPlaceholder: row.nombre_espec
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_espec=nombre;
      this._especialidadService.crud('U',row)
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
      row.pk_espec=0;
      row.nombre_espec=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this._especialidadService.crud('I',row)
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
          this._especialidadService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }
}
