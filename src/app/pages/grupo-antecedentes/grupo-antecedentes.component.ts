import { Component, OnInit } from '@angular/core';
import { GrupoAntecedentesService } from '../../services/grupo-antecedentes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-grupo-antecedentes',
  templateUrl: './grupo-antecedentes.component.html',
  styles: []
})
export class GrupoAntecedentesComponent implements OnInit {
  cargando_tabla:boolean=true;
  lista:any[]=[];
 rowTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_grupant:null,
    nombre_grupant:null
  }
  constructor( public _service:GrupoAntecedentesService) { }

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
      inputValue: row.nombre_grupant,
      inputPlaceholder: row.nombre_grupant
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_grupant=nombre;
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
      row.pk_grupant=0;
      row.nombre_grupant=nombre;
      
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

  