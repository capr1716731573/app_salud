import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { AgendaService } from '../../services/agenda.service';
import { EspecialidadUserService } from '../../services/especialidad-user.service';
import { GeografiaService } from '../../services/geografia.service';
import { SettingsService } from '../../services/settings/settings.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
declare var $:any;


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styles: []
})
export class AgendaComponent implements OnInit {
  cargando_tabla:boolean=true;
  cargando_tablaxDia:boolean=false;
  listaAgenda:any[]=[];
  listaAgendaXDia:any[]=[];
  listaMedicos:any[]=[];
  listaUbicacion:any[]=[];
  captacionVacunasTarget:any;
  fecha_inicio:any=moment().subtract(1, 'months').format('YYYY-MM-DD');
  fecha_fin:any=moment().add(1, 'months').format('YYYY-MM-DD');
  fecha_actual=moment().format('YYYY-MM-DD');
  hora_actual=moment().format('HH:mm');
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  cargando_items:boolean=true;
  cargando_accion:boolean=false;
  accion:string='I';
  desde:number=0;
  totalRegistros:number=0;
  agendaTarget:agendaModel={
    pk_age:0,
    pk_ubigeo:null,
    pk_espemed:null,
    fecha_age:null,
    hora_age:this.hora_actual,
    medio_age:'LLAMADA',
    nombres_age:null,
    apellidos_age:null,
    telefono_age:null,
    celular_age:null,
    estado_age:'PENDIENTE',
    audit_creacion:null,
    audit_modificacion:null
  }

  //MENSAJES TOAST
  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  /*   Variables Calendario y Segundo Tab*/
  modelCalendarioFecha: NgbDateStruct;
  date: {year: number, month: number};
  pk_especialista:any;
  fecha_cita:any;



  constructor( public _agendaService:AgendaService,
               public _especialidad_medico:EspecialidadUserService,
               public _ubicacionGeograficaService:GeografiaService,
               public _settingsService:SettingsService,
               private calendar: NgbCalendar) { 
               
             
               }
/************** */
  
  selectToday() {
    this.modelCalendarioFecha = this.calendar.getToday();
    
  }
  seleccionDia(dia:any){
    this.fecha_cita=`${this.modelCalendarioFecha.year}-${this.modelCalendarioFecha.month}-${this.modelCalendarioFecha.day}`;
    this.fecha_cita=moment(this.fecha_cita).format('YYYY-MM-DD');
    console.error(this.fecha_cita);
    
  }
  
/******************* */
  ngOnInit() { 
    this.cargarAll();
    this.cargarUbicacionGeografica();
    this.cargarMedicos();

  }

  cargarUbicacionGeografica(){
    this._ubicacionGeograficaService.cargarGeografiaTodos()
        .subscribe((datos:any)=>{
          this.listaUbicacion=Object.values(datos);
        })
  }

  cargarMedicos(){
    this._especialidad_medico.cargarMedicosEspecialidad()
        .subscribe((datos:any)=>{
          this.listaMedicos=Object.values(datos);
         
        })
  }

  cargarAll(){
    this._agendaService.cargarDatos(this.fecha_inicio,this.fecha_fin)
        .subscribe((datos:any)=>{
          this.listaAgenda=Object.values(datos.data);
          this.totalRegistros=datos.total_registros;
          this.cargando_tabla=false;
        })
  }

  cargarAllXFechaEspecialista(){
   
    if(!this.fecha_cita || this.pk_especialista==0 || !this.pk_especialista){
      swal.fire(
        `Falta Parámetros`,
        'Debe seleccionar la fecha y el médico para realizar la búsqueda',
        'error'
      )
    }else{
      this.cargando_tablaxDia=true;
      this._agendaService.cargarDatosXDia(this.pk_especialista,this.fecha_cita)
          .subscribe((datos:any)=>{
            this.listaAgendaXDia=Object.values(datos.data);
            this.cargando_tablaxDia=false;
          })
      }
  }

  buscarFechas(){
    if(this.fecha_inicio > this.fecha_fin){
      swal.fire(
        `Rango de Fechas Errónea`,
        'La fecha de Inicio no debe ser mayor que la fecha fin de búsqueda',
        'error'
      )
    }else{
      let intervaloDiasBsq=moment(this.fecha_fin).diff(moment(this.fecha_inicio), 'days');
      if (intervaloDiasBsq <= 180){
        this.cargando_tabla=true;
        this.cargarAll();
      }else{
        swal.fire(
          `Revisar Intervalo de Fechas`,
          'El intervalo de fechas para búsqueda es máximo de 6 meses.',
          'error'
        )
      }
      
     
    }
    
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
    this.listaAgenda=[];
    if(termino.length <= 0){
      this.cargando_tabla=true;
      this.desde=0;
      this.cargarAll();
    }else if(termino.length >= 3){
    this.cargando_tabla=true;
    this._agendaService.cargarDatosBusqueda(termino)
        .subscribe( (datos:any) => {
          this.listaAgenda=datos;
          this.cargando_tabla=false;
        })
    }else{
      this.listaAgenda=this.listaAgenda;
      this.cargando_tabla=false;
    }
  }

editar(row:any){
  this.cargando_accion=true;
  this.agendaTarget=row;
  this.agendaTarget.fecha_age=moment(row.fecha_age).format('YYYY-MM-DD');
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
  $('#modalAgenda').modal('hide');
}


guardar(){
  let accion;
  if(this.accion === 'I'){ 
    accion='Ingresado';
    this.agendaTarget.audit_creacion=this._settingsService.getInfoUser();
  }else{ 
    this.agendaTarget.audit_modificacion=this._settingsService.getInfoUser();
    accion='Actualizado';
  }
  this._agendaService.crud(this.accion,this.agendaTarget)
  .subscribe((resp:any) => {
    
    this.cargarAll();
    if(this.fecha_cita && this.pk_especialista){
      this.cargarAllXFechaEspecialista();
    }
    
    swal.fire({
      //position: 'top',
      type: 'success',
      title: `Registro ${accion}!!`,
      showConfirmButton: false,
      timer: 1500
    })
    $('#modalAgenda').modal('hide');
  });

}

cerrarModal(){
  return 'modal';
}

resetTarget(){
  this.agendaTarget={
    pk_age:0,
    pk_ubigeo:null,
    pk_espemed:null,
    fecha_age:this.fecha_actual,
    hora_age:this.hora_actual,
    medio_age:'LLAMADA',
    nombres_age:null,
    apellidos_age:null,
    telefono_age:null,
    celular_age:null,
    estado_age:'PENDIENTE',
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
        this._agendaService.crud('D',row)
            .subscribe((resp:any) => {
              this.cargarAll();
              if(this.fecha_cita && this.pk_especialista){
                this.cargarAllXFechaEspecialista();
              }
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

export interface agendaModel{
  pk_age:number,
  pk_ubigeo:number,
  pk_espemed:number,
  fecha_age:any,
  hora_age:any,
  medio_age:string,
  nombres_age:string,
  apellidos_age:string,
  telefono_age:string,
  celular_age:string,
  estado_age:string,
  audit_creacion:any,
  audit_modificacion:any
}

