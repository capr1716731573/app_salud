import { Component, OnInit } from '@angular/core';
import { AuxiliarDiagnosticoService } from '../../services/auxiliar-diagnostico.service';
import { ExamenAuxiliarDiagnosticoService } from '../../services/examen-auxiliar-diagnostico.service';
import swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-auxiliar-diagnostico',
  templateUrl: './auxiliar-diagnostico.component.html',
  styles: []
})
export class AuxiliarDiagnosticoComponent implements OnInit {

  cargando_tabla:boolean=true;
  cargando_accion:boolean=false;
  cargando_items:boolean=true;
  accion:string='I';
  listaAuxiliarDiagnostico:any[]=[];
  listaExamenAuxiliarDiagnostico:any[]=[];
 AuxiliarDiagnosticoTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
//MENSAJES TOAST
  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  
  tipoExamenAuxiliarDiagnosticoTarget:examenAuxDiagModel={
    pk_exa:null,
    pk_auxdiag:null,
    nombre_exa:null,
    activo_exa:true
  }
  
  auxiliarDiagnosticoTarget:auxiliarDiagnosticoModel={
    pk_auxdiag:null,
    nombre_auxdiag:null
  };
  constructor( public _auxiliarDiagnosticoService:AuxiliarDiagnosticoService,
               public _examenAuxDiagService:ExamenAuxiliarDiagnosticoService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._auxiliarDiagnosticoService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaAuxiliarDiagnostico=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_auxdiag,
      inputPlaceholder: row.nombre_auxdiag
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_auxdiag=nombre;
      this._auxiliarDiagnosticoService.crud('U',row)
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
      row.pk_auxdiag=0;
      row.nombre_auxdiag=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this._auxiliarDiagnosticoService.crud('I',row)
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
          this._auxiliarDiagnosticoService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }

    /*TAB REGIONES DE TIPO DE ANTECEDENTES*/
    cargarExamenAuxDiag(row:any){
      this.auxiliarDiagnosticoTarget=row;
      this._examenAuxDiagService.cargarDatos(row.pk_auxdiag)
          .subscribe((datos:any)=>{
            this.listaExamenAuxiliarDiagnostico=Object.values(datos);
            console.log(JSON.stringify(datos));
            this.cargando_items=false;
          })
    }

    resetExamenAuxDiag(){
      this.tipoExamenAuxiliarDiagnosticoTarget={
        pk_exa:null,
        pk_auxdiag:null,
        nombre_exa:null,
        activo_exa:true
      }
    }

    eliminarExamenAuxiliarDiagnosticoTarget(row:any){
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
          this._examenAuxDiagService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarExamenAuxDiag(row);
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }


     editarExamenAuxiliarDiagnosticoTarget(row:any){
      this.cargando_accion=true;
      this.tipoExamenAuxiliarDiagnosticoTarget=row;
      this.tipoExamenAuxiliarDiagnosticoTarget.pk_auxdiag=this.auxiliarDiagnosticoTarget.pk_auxdiag;
      this.accion='U';
      this.cargando_accion=false;
    }
  
    nuevo_ExamenAuxiliarDiagnostico(){
      this.cargando_accion=true;
      this.resetExamenAuxDiag();
      this.tipoExamenAuxiliarDiagnosticoTarget.pk_auxdiag=this.auxiliarDiagnosticoTarget.pk_auxdiag;
      this.accion='I';
      this.cargando_accion=false;
     
    }
  
    cancelarExamenAuxiliarDiagnosticoTarget(){
      this.cargarExamenAuxDiag(this.auxiliarDiagnosticoTarget);
      $('#modalAuxiliarDiagnostico').modal('hide');
    }
  
    actualizarItemActivo(item:any){
      item.activo_exa=!item.activo_exa;
      console.log(JSON.stringify(item));
      this._examenAuxDiagService.crud('U',item)
          .subscribe((item_actualizado:any)=>{
            this.toast.fire({
              type: 'success',
              title: 'Actualización item '+item.nombre_exa+' realizada.'
            })
          });
      
    }
  
    
    guardarExamenAuxiliarDiagnostico(){
      let accion;
      if(this.accion === 'I'){ 
        accion='Ingresado';
        
      }else{ 
        
        accion='Actualizado';
      }
      this._examenAuxDiagService.crud(this.accion,this.tipoExamenAuxiliarDiagnosticoTarget)
      .subscribe((resp:any) => {
        this.cargarExamenAuxDiag(this.auxiliarDiagnosticoTarget);
        //swal.fire(`Registro ${accion}!!`)
        swal.fire({
          //position: 'top',
          type: 'success',
          title: `Registro ${accion}!!`,
          showConfirmButton: false,
          timer: 1500
        })
        $('#modalAuxiliarDiagnostico').modal('hide');
      });
  
    }
}

export interface examenAuxDiagModel{
  pk_exa:number,
  pk_auxdiag:number,
  nombre_exa:string,
  activo_exa:boolean
}

export interface auxiliarDiagnosticoModel{
  pk_auxdiag:number,
  nombre_auxdiag:string
}


  


