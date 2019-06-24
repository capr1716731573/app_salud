import { Component, OnInit } from '@angular/core';
import { TipoOrganosSistemasService } from '../../services/tipo-organos-sistemas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-organos-sistemas',
  templateUrl: './tipos-organos-sistemas.component.html',
  styles: []
})
export class TiposOrganosSistemasComponent implements OnInit {

cargando_tabla:boolean=true;
listaTiposOrganosSistemas:any[]=[];
tiporgTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_tiporg:null,
    nombre_tiporg:null
  }
  constructor( public tipoOrganosSistemasService:TipoOrganosSistemasService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this.tipoOrganosSistemasService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaTiposOrganosSistemas=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_tiporg,
      inputPlaceholder: row.nombre_tiporg
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_tiporg=nombre;
      this.tipoOrganosSistemasService.crud('U',row)
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
      row.pk_tiporg=0;
      row.nombre_tiporg=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this.tipoOrganosSistemasService.crud('I',row)
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
          this.tipoOrganosSistemasService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }
}
