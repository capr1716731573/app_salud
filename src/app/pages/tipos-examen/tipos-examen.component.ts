import { Component, OnInit } from '@angular/core';
import { TipoExamenService } from '../../services/tipo-examen.service';
import swal from 'sweetalert2';
import { RegionesTipoExamenService } from '../../services/regiones-tipo-examen.service';
declare var $:any;

@Component({
  selector: 'app-tipos-examen',
  templateUrl: './tipos-examen.component.html',
  styles: []
})
export class TiposExamenComponent implements OnInit {

  cargando_tabla:boolean=true;
  cargando_items:boolean=true;
  cargando_accion:boolean=false;
  listaTipoExamen:any[]=[];
  listaRegionExamen:any[]=[];
  accion:string='I';
  regionExamenTarget:regionesModel={
    pk_regexa:0,
    pk_tipexa:null,
    nombre_regexa:null,
    activo_regexa:true
  }
  
  tipoExamenTarget:tipoExamenModel={
    pk_tipexa:null,
    nombre_tipexa:null
  };


  //MENSAJES TOAST
  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas

  constructor( public _tipoExamenService:TipoExamenService,
               public _regionTipoExamen:RegionesTipoExamenService) { }

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

  resetTipoExamenTarget(){
    this.tipoExamenTarget={
      pk_tipexa:null,
      nombre_tipexa:null
    }
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

    /*TAB REGIONES DE TIPO DE EXAMEN FISICO*/
    cargarRegionesTipoExamen(row:any){
      this.tipoExamenTarget=row;
      console.log('REGIONES TIPO EXAMEN: '+JSON.stringify(row));
      this._regionTipoExamen.cargarDatos(row.pk_tipexa)
          .subscribe((datos:any)=>{
            this.listaRegionExamen=Object.values(datos);
            console.log(JSON.stringify(datos));
            this.cargando_items=false;
          })
    }

    resetRegionTarget(){
      this.regionExamenTarget={
        pk_regexa:0,
        pk_tipexa:null,
        nombre_regexa:null,
        activo_regexa:true
      }
    }

    eliminarRegion(row:any){
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
          this._regionTipoExamen.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarRegionesTipoExamen(row);
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }


     editarRegion(row:any){
      this.cargando_accion=true;
      this.regionExamenTarget=row;
      this.regionExamenTarget.pk_tipexa=this.tipoExamenTarget.pk_tipexa;
      this.accion='U';
      this.cargando_accion=false;
    }
  
    nuevo_region(){
      this.cargando_accion=true;
      this.resetRegionTarget();
      this.regionExamenTarget.pk_tipexa=this.tipoExamenTarget.pk_tipexa;
      this.accion='I';
      this.cargando_accion=false;
     
    }
  
    cancelarRegionExamen(){
      this.cargarRegionesTipoExamen(this.tipoExamenTarget);
      $('#modalRegionExamen').modal('hide');
    }
  
    actualizarItemActivo(item){
      item.activo_regexa=!item.activo_regexa;
      this._regionTipoExamen.crud('U',item)
          .subscribe((item_actualizado:any)=>{
            this.toast.fire({
              type: 'success',
              title: 'Actualización item '+item.nombre_regexa+' realizada.'
            })
          });
      
    }
  
    
    guardarRegionExamen(){
      let accion;
      if(this.accion === 'I'){ 
        accion='Ingresado';
        
      }else{ 
        
        accion='Actualizado';
      }
      this._regionTipoExamen.crud(this.accion,this.regionExamenTarget)
      .subscribe((resp:any) => {
        this.cargarRegionesTipoExamen(this.tipoExamenTarget);
        //swal.fire(`Registro ${accion}!!`)
        swal.fire({
          //position: 'top',
          type: 'success',
          title: `Registro ${accion}!!`,
          showConfirmButton: false,
          timer: 1500
        })
        $('#modalRegionExamen').modal('hide');
      });
  
    }
  
    
}

export interface regionesModel{
  pk_regexa:number,
  pk_tipexa:number,
  nombre_regexa:string,
  activo_regexa:boolean
}

export interface tipoExamenModel{
  pk_tipexa:number,
  nombre_tipexa:string
}

