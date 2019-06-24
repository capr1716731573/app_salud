import { Component, OnInit } from '@angular/core';
import { NivelEducacionService } from '../../services/nivel-educacion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nivel-educacion',
  templateUrl: './nivel-educacion.component.html',
  styles: []
})
export class NivelEducacionComponent implements OnInit {
  cargando_tabla:boolean=true;
  listaNivelEducacion:any[]=[];
  niveduTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_nivedu:null,
    nombre_nivedu:null
  }
  constructor( public _nivelEducacionService:NivelEducacionService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._nivelEducacionService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaNivelEducacion=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_nivedu,
      inputPlaceholder: row.nombre_nivedu
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_nivedu=nombre;
      this._nivelEducacionService.crud('U',row)
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
      row.pk_nivedu=0;
      row.nombre_nivedu=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this._nivelEducacionService.crud('I',row)
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
          this._nivelEducacionService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      //alert(JSON.stringify(row));
    }
}
