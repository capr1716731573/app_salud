import { Component, OnInit } from '@angular/core';
import { ProfesionesService } from '../../services/profesiones.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styles: []
})
export class ProfesionesComponent implements OnInit {
  cargando_tabla:boolean=true;
  listaProfesiones:any[]=[];
  profesionTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_prof:null,
    nombre_prof:null
  }
  constructor( public _profesionService:ProfesionesService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._profesionService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaProfesiones=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_prof,
      inputPlaceholder: row.nombre_prof
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_prof=nombre;
      this._profesionService.crud('U',row)
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
      row.pk_prof=0;
      row.nombre_prof=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this._profesionService.crud('I',row)
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
          this._profesionService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      //alert(JSON.stringify(row));
    }
}
