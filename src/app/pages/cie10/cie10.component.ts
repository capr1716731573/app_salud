import { Component, OnInit } from '@angular/core';
import { Cie10Service } from '../../services/cie10.service';
import swal from 'sweetalert2';
import { SettingsService } from '../../services/settings/settings.service';
declare var $:any;



@Component({
  selector: 'app-cie10',
  templateUrl: './cie10.component.html',
  styles: []
})
export class Cie10Component implements OnInit {
  
  cargando_tabla:boolean=true;
  cargando_accion:boolean=false;
  listaCIE10:any[]=[];
  accion:string='I';
  desde:number=0;
  totalRegistros:number=0;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  cie10Target:any={
    pk_cie:null,
    nombre_cie:null,
    codigo_cie:null,
    estado_cie:null,
    audit_creacion:null,
    audit_modificacion:null
  }
  constructor( public _cie10Service:Cie10Service,
               public _settingsService:SettingsService) { }

  ngOnInit() { 
    this.cargarAll();
    
  }

  cargarAll(){
    this._cie10Service.cargarDatos(this.desde)
        .subscribe((datos:any)=>{
          this.listaCIE10=Object.values(datos.data);
          this.totalRegistros=datos.total_registros;
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

    //cada vez que se ejecuta esta funcion carga al web services
    cambiarDesde(valor:number){
      let desde= this.desde+valor;
      
      if(desde >= this.totalRegistros){
        return;
      }
  
      if(desde < 0){
        return;
      }
  
      this.desde+=valor;
      this.cargarAll();
    }


    buscar(termino:string){
      this.listaCIE10=[];
      if(termino.length <= 0){
        this.cargando_tabla=true;
        this.desde=0;
        this.cargarAll();
      }else if(termino.length >= 3){
      this.cargando_tabla=true;
      this._cie10Service.cargarDatosBusqueda(termino)
          .subscribe( (datos:any) => {
            this.listaCIE10=datos;
            this.cargando_tabla=false;
          })
      }else{
        this.listaCIE10=this.listaCIE10;
        this.cargando_tabla=false;
      }
    }

  editar(row:any){
    this.cargando_accion=true;
    this.cie10Target=row;
    this.accion='U';
    this.cargando_accion=false;
  }

  insertar(){
    this.cargando_accion=true;
    this.resetTarget();
    this.accion='I';
    this.cargando_accion=false;
   
  }

  cancelar(){
    this.cargarAll();
    $('#modalForm').modal('hide');
  }

  
  guardar(){
    let accion;
    if(this.accion === 'I'){ 
      accion='Ingresado';
      this.cie10Target.audit_creacion=this._settingsService.getInfoUser();
    }else{ 
      this.cie10Target.audit_modificacion=this._settingsService.getInfoUser();
      accion='Actualizado';
    }
    this._cie10Service.crud(this.accion,this.cie10Target)
    .subscribe((resp:any) => {
      this.cargarAll();
      //swal.fire(`Registro ${accion}!!`)
      swal.fire({
        //position: 'top',
        type: 'success',
        title: `Registro ${accion}!!`,
        showConfirmButton: false,
        timer: 1500
      })
      $('#modalForm').modal('hide');
    });

  }

  cerrarModal(){
    return 'modal';
  }

  resetTarget(){
    this.cie10Target={
      pk_cie:null,
      nombre_cie:null,
      codigo_cie:null,
      estado_cie:true,
      audit_creacion:null,
      audit_modificacion:null
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
          this._cie10Service.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire({
                  //position: 'top',
                  type: 'success',
                  title: `Registro Eliminado!!`,
                  showConfirmButton: false,
                  timer: 1500
                })
              });
        }
      })
      
    }
}
