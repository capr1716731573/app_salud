import { Component, OnInit, ɵConsole } from '@angular/core';
import { GrupoAntecedentesService } from '../../services/grupo-antecedentes.service';
import { TipoAntecedentesService } from '../../services/tipo-antecedentes.service';
import swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-grupo-antecedentes',
  templateUrl: './grupo-antecedentes.component.html',
  styles: []
})
export class GrupoAntecedentesComponent implements OnInit {
  cargando_tabla:boolean=true;
  cargando_accion:boolean=false;
  cargando_items:boolean=true;
  accion:string='I';
  lista:any[]=[];
  listaTipoExamen:any[]=[];
   rowTarget:any;

  //MENSAJES TOAST
  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  tipoAntecedentesTarget:tipoAntecedentesModel={
    pk_tipant:null,
    pk_grupant:null,
    nombre_tipant:null,
    activo_tipant:true
  }
  
  grupoAntecedenteTarget:grupoAntecedentesModel={
    pk_grupant:null,
    nombre_grupant:null
  };
  constructor( public _service:GrupoAntecedentesService,
               public _serviceTipoAntecedentes: TipoAntecedentesService) { }

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

     /*TAB REGIONES DE TIPO DE ANTECEDENTES*/
    cargarTipoAntecedente(row:any){
      this.grupoAntecedenteTarget=row;
      this._serviceTipoAntecedentes.cargarDatos(row.pk_grupant)
          .subscribe((datos:any)=>{
            this.listaTipoExamen=Object.values(datos);
            console.log(JSON.stringify(datos));
            this.cargando_items=false;
          })
    }

    resetTipoAntecedente(){
      this.tipoAntecedentesTarget={
        pk_tipant:null,
        pk_grupant:null,
        nombre_tipant:null,
        activo_tipant:true
      }
    }

    eliminarTipoAntecedente(row:any){
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
          this._serviceTipoAntecedentes.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarTipoAntecedente(row);
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }


     editarTipoAntecedente(row:any){
      this.cargando_accion=true;
      this.tipoAntecedentesTarget=row;
      this.tipoAntecedentesTarget.pk_grupant=this.grupoAntecedenteTarget.pk_grupant;
      this.accion='U';
      this.cargando_accion=false;
    }
  
    nuevo_TipoAntecedente(){
      this.cargando_accion=true;
      this.resetTipoAntecedente();
      this.tipoAntecedentesTarget.pk_grupant=this.grupoAntecedenteTarget.pk_grupant;
      this.accion='I';
      this.cargando_accion=false;
     
    }
  
    cancelarTipoAntecedente(){
      this.cargarTipoAntecedente(this.grupoAntecedenteTarget);
      $('#modalTipoAntecedente').modal('hide');
    }
  
    actualizarItemActivo(item:any){
      item.activo_tipant=!item.activo_tipant;
      console.log(JSON.stringify(item));
      this._serviceTipoAntecedentes.crud('U',item)
          .subscribe((item_actualizado:any)=>{
            this.toast.fire({
              type: 'success',
              title: 'Actualización item '+item.nombre_tipant+' realizada.'
            })
          });
      
    }
  
    
    guardarTipoAntecedente(){
      let accion;
      if(this.accion === 'I'){ 
        accion='Ingresado';
        
      }else{ 
        
        accion='Actualizado';
      }
      this._serviceTipoAntecedentes.crud(this.accion,this.tipoAntecedentesTarget)
      .subscribe((resp:any) => {
        this.cargarTipoAntecedente(this.grupoAntecedenteTarget);
        //swal.fire(`Registro ${accion}!!`)
        swal.fire({
          //position: 'top',
          type: 'success',
          title: `Registro ${accion}!!`,
          showConfirmButton: false,
          timer: 1500
        })
        $('#modalTipoAntecedente').modal('hide');
      });
  
    }
}

export interface tipoAntecedentesModel{
  pk_tipant:number,
  pk_grupant:number,
  nombre_tipant:string,
  activo_tipant:boolean
}

export interface grupoAntecedentesModel{
  pk_grupant:number,
  nombre_grupant:string
}


  