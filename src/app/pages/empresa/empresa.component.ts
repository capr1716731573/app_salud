import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';
import { SettingsService } from '../../services/settings/settings.service';
declare var $:any;


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: []
})
export class EmpresaComponent implements OnInit {

  cargando_tabla:boolean=true;
  cargando_accion:boolean=false;
  listaEmpresa:any[]=[];
  accion:string='I';
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  empresaTarget:any={
    pk_empre:null,
    nombre_empre:null,
    direccion_empre:null,
    telefono_empre:null,
    ruc_empre:null,
  }
  constructor( public _empresaService:EmpresaService,
               public _settingsService:SettingsService) { }

  ngOnInit() { 
    this.cargarAll();
    
  }

  cargarAll(){
    this._empresaService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaEmpresa=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

    //cada vez que se ejecuta esta funcion carga al web service


  editar(row:any){
    this.cargando_accion=true;
    this.empresaTarget=row;
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
    }else{ 
      accion='Actualizado';
    }
    this._empresaService.crud(this.accion,this.empresaTarget)
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
    this.empresaTarget={
      pk_empre:null,
      nombre_empre:null,
      direccion_empre:null,
      telefono_empre:null,
      ruc_empre:null,
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
          this._empresaService.crud('D',row)
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
