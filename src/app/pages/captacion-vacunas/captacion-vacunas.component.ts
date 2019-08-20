import { Component, OnInit } from '@angular/core';
import { CaptacionVacunasService } from '../../services/captacion-vacunas.service';
import swal from 'sweetalert2';
import { TipoVacunasService } from '../../services/tipo-vacunas.service';
declare var $:any; 

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
  cargando_items:boolean=true;
  cargando_accion:boolean=false;
  listaTipoVacuna:any[]=[];
  accion:string='I';
  tipoVacunaTarget:tipoVacunaModel={
    pk_tipvac:0,
    pk_tipcap:null,
    nombre_tipvac:null,
    activo_tipvac:true
  }
  
  captacionVacunaTarget:captacionVacunaModel={
    pk_tipcap:null,
    nombre_tipcap:null
  };


  //MENSAJES TOAST
  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor( public _captacionVacunasService:CaptacionVacunasService,
               public _tipoVacunaService:TipoVacunasService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._captacionVacunasService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaCaptacionVacunas=Object.values(datos);
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

    
    /*TAB REGIONES DE TIPO DE EXAMEN FISICO*/
    cargarTipoVacunas(row:any){
      this.captacionVacunaTarget=row;
      this._tipoVacunaService.cargarDatos(row.pk_tipcap)
          .subscribe((datos:any)=>{
            this.listaTipoVacuna=Object.values(datos);
            this.cargando_items=false;
          })
    }

    resetTipoVacunaTarget(){
      this.tipoVacunaTarget={
        pk_tipvac:0,
        pk_tipcap:null,
        nombre_tipvac:null,
        activo_tipvac:true
      }
    }

    eliminarTipoVacuna(row:any){
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
          this._tipoVacunaService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarTipoVacunas(row);
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }


     editarTipoVacuna(row:any){
      this.cargando_accion=true;
      this.tipoVacunaTarget=row;
      this.tipoVacunaTarget.pk_tipcap=this.captacionVacunaTarget.pk_tipcap;
      this.accion='U';
      this.cargando_accion=false;
    }
  
    nuevo_tipovacuna(){
      this.cargando_accion=true;
      this.resetTipoVacunaTarget();
      this.tipoVacunaTarget.pk_tipcap=this.captacionVacunaTarget.pk_tipcap;
      this.accion='I';
      this.cargando_accion=false;
     
    }
  
    cancelarTipoVacuna(){
      this.cargarTipoVacunas(this.captacionVacunaTarget);
      $('#modalTipoVacuna').modal('hide');
    }
  
    actualizarItemActivo(item){
      item.activo_tipvac=!item.activo_tipvac;
      this._tipoVacunaService.crud('U',item)
          .subscribe((item_actualizado:any)=>{
            this.toast.fire({
              type: 'success',
              title: 'Actualización item '+item.nombre_tipvac+' realizada.'
            })
          });
      
    }
  
    
    guardarTipoVacuna(){
      let accion;
      if(this.accion === 'I'){ 
        accion='Ingresado';
        
      }else{ 
        
        accion='Actualizado';
      }
      this._tipoVacunaService.crud(this.accion,this.tipoVacunaTarget)
      .subscribe((resp:any) => {
        this.cargarTipoVacunas(this.captacionVacunaTarget);
        //swal.fire(`Registro ${accion}!!`)
        swal.fire({
          //position: 'top',
          type: 'success',
          title: `Registro ${accion}!!`,
          showConfirmButton: false,
          timer: 1500
        })
        $('#modalTipoVacuna').modal('hide');
      });
  
    }
  
}

export interface tipoVacunaModel{
  pk_tipvac:number,
  pk_tipcap:number,
  nombre_tipvac:string,
  activo_tipvac:boolean
}

export interface captacionVacunaModel{
  pk_tipcap:number,
  nombre_tipcap:string
}

  