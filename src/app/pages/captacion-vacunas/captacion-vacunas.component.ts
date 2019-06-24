import { Component, OnInit } from '@angular/core';
import { CaptacionVacunasService } from '../../services/captacion-vacunas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-captacion-vacunas',
  templateUrl: './captacion-vacunas.component.html',
  styles: []
})
export class CaptacionVacunasComponent implements OnInit {
  cargando_tabla:boolean=true;
  listaCaptacionVacunas:any[]=[];
 captacionVacunasTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_tipcap:null,
    nombre_tipcap:null
  }
  constructor( public _captacionVacunasService:CaptacionVacunasService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._captacionVacunasService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaCaptacionVacunas=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_tipcap,
      inputPlaceholder: row.nombre_tipcap
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_tipcap=nombre;
      this._captacionVacunasService.crud('U',row)
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
      row.pk_tipcap=0;
      row.nombre_tipcap=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this._captacionVacunasService.crud('I',row)
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
          this._captacionVacunasService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }
}

  