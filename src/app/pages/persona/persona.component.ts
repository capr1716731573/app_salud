import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit,AfterViewChecked } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { PersonaService } from '../../services/persona.service';
import { TipoIdentificacionService } from '../../services/tipo-identificacion.service';
import { GeografiaService } from '../../services/geografia.service';
import { NivelEducacionService } from '../../services/nivel-educacion.service';
import { ProfesionesService } from '../../services/profesiones.service';
import swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: []
})
export class PersonaComponent implements OnInit, AfterViewChecked {
 
  cargando_tabla:boolean=true;
  banderaEdicionVezCargaUbicacion:boolean=false;
  banderaNuevoVezCargaUbicacion:boolean=false;
  listaTipoIdentificacion:any[]=[];
  listaGeografia:any[]=[];
  listaNivelEducacion:any[]=[];
  listaProfesiones:any[]=[];
  //Adicionales
  listaPais:any[]=[];
  listaProvincia:any[]=[];
  listaCiudad:any[]=[];
  listaParroquia:any[]=[];
  pais:any;
  provincia:any;
  ciudad:any;
  parroquia:any;
  tipoDoc:string='NINGUNO';

  //MENSAJES TOAST
  toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  @Output() personaTargetChange:EventEmitter<any> = new EventEmitter();
  @Input() personaTarget:personaModel={
    pk_person:null,
    pk_tipiden:null,
    numidentificacion_person:null,
    nombres_person:null,
    apellidos_person:null,
    estadocivil_person:null,
    sexo_person:null,
    telefono_person:null,
    celular_person:null,
    correo_person:null,
    pk_ubigeo:null,
    fechanac_person:null,
    direccion_person:null ,
    pk_nivedu:null,
    pk_prof:null,
    ocupacion_person:null ,
    audit_creacion:null,
    audit_modificacion:null,
  }
  constructor(public _settingsService:SettingsService,
              public _personaService:PersonaService,
              public _tipoIdentificacionService:TipoIdentificacionService,
              public _geografiaService:GeografiaService,
              public _nivelEducacionService:NivelEducacionService,
              public _profesionService:ProfesionesService) { 
                
  }

  ngOnInit(){
    this.cargarTipoIdentificacion();
    this.cargarNivelEducacion();
    this.cargarProfesiones();
    
  }

  onPersonaTargetChange() { 
    this.personaTargetChange.emit(this.personaTarget);
  } 
    
  ngAfterViewChecked(): void {
    //FUNCION QUE SE UTILIZA EN LA EDICION
    if(this.personaTarget.pk_person && !this.banderaEdicionVezCargaUbicacion){
      
     
    
      this.cargando_tabla=true;
      this.listaPais=[];
      this.listaProvincia=[];
      this.listaCiudad=[];
      this.listaParroquia=[];
      this.cargarUbicaciones(this.personaTarget);
     
      this.banderaEdicionVezCargaUbicacion=true;
      this.cargando_tabla=false;      
    }
    
    //FUNCION QUE SE UTILIZA CUANDO ES NUEVO
    if(!this.banderaNuevoVezCargaUbicacion) {
     
      this._geografiaService.cargarGeografia(0)
          .subscribe((paises:any)=>{
            this.listaPais=Object.values(paises);
          });
      this.banderaNuevoVezCargaUbicacion=true;
    }
  }



  cargarPaises(){
    this.cargando_tabla=true;
    this._geografiaService.cargarGeografia(0)
        .subscribe((paises:any)=>{
          this.listaPais=Object.values(paises);
          this.cargando_tabla=false;
          this.asignarUbicacion();
    })
    
  }

  cargarProvincias(){
    
    if(this.pais){
      this._geografiaService.cargarGeografia(this.pais)
          .subscribe((provincias:any)=>{
            this.listaProvincia=[];
            this.listaCiudad=[];
            this.listaParroquia=[];
            this.provincia=this.ciudad=this.parroquia=null;
            this.listaProvincia=Object.values(provincias);
            this.asignarUbicacion();
          })
      }
      else{
        swal.fire(
          'Faltan Datos',
          'Debe seleccionar pais o el pais seleccionado no contiene datos.',
          'warning'
        )
      }
      
  }

  cargarCiudades(){
    
    if(this.provincia){
    this._geografiaService.cargarGeografia(this.provincia)
        .subscribe((ciudades:any)=>{
          this.listaCiudad=[];
          this.listaParroquia=[];
          this.ciudad=this.parroquia=null;
          this.listaCiudad=Object.values(ciudades);
          this.cargando_tabla=false;
          this.asignarUbicacion();
        })
      }
      else{
        swal.fire(
          'Faltan Datos',
          'Debe seleccionar provincia o la provincia seleccionada no contiene datos.',
          'warning'
        )
      }
     
  }

  cargarParroquias(){
    if(this.ciudad){
    this._geografiaService.cargarGeografia(this.ciudad)
        .subscribe((parroquias:any)=>{
          this.listaParroquia=[];
          this.parroquia=null;
          this.listaParroquia=Object.values(parroquias);
          this.asignarUbicacion();
        })
      }
      else{
          swal.fire(
          'Faltan Datos',
          'Debe seleccionar ciudad o la ciudad seleccionada no contiene datos.',
          'warning'
        )
      }
      
  }

  asignarUbicacion(){
    if(this.pais){
      this.personaTarget.pk_ubigeo=this.pais;
      if(this.provincia){
        this.personaTarget.pk_ubigeo=this.provincia;
        if(this.ciudad){
          this.personaTarget.pk_ubigeo=this.ciudad;
          if(this.parroquia){
            this.personaTarget.pk_ubigeo=this.parroquia;
          }
        }
      }
    }else{
      this.personaTarget.pk_ubigeo=null;
    }
  }

  cargarUbicaciones(person:any){
    
    if(person.pk_ubigeo){
      this._geografiaService.cargarGeografiaID(person.pk_ubigeo)
          .subscribe((ubicacion:any)=>{
          
            if(ubicacion.tipo_ubigeo === 'PR'){
              
              this._geografiaService.cargarGeografiaParroquia(this.personaTarget.pk_ubigeo)
                  .subscribe((geo:any)=>{
                   
                    this.pais=geo.pk_pais;
                    this.provincia=geo.pk_provincia;
                    this.ciudad=geo.pk_ciudad;
                    this.parroquia=geo.pk_parroquia;

                    this._geografiaService.cargarGeografia(0)
                        .subscribe((paises:any)=>{
                          this.pais=geo.pk_pais;
                          this.listaPais=Object.values(paises);
                          this._geografiaService.cargarGeografia(this.pais)
                              .subscribe((provincias:any)=>{
                                this.provincia=geo.pk_provincia;
                                this.listaProvincia=Object.values(provincias);
                                this._geografiaService.cargarGeografia(this.provincia)
                                    .subscribe((ciudades:any)=>{
                                      this.ciudad=geo.pk_ciudad;
                                      this.listaCiudad=Object.values(ciudades);
                                      this._geografiaService.cargarGeografia(this.ciudad)
                                          .subscribe((parroquias:any)=>{
                                            this.parroquia=geo.pk_parroquia;
                                            this.listaParroquia=Object.values(parroquias);

                                            this.cargando_tabla=false;
                                          })
                                    })
                              })
                        })                   
                  });
            }else if(ubicacion.tipo_ubigeo === 'C'){
              this._geografiaService.cargarGeografiaCiudad(this.personaTarget.pk_ubigeo)
              .subscribe((geo:any)=>{
                this.pais=geo.pk_pais;
                this.provincia=geo.pk_provincia;
                this.ciudad=this.personaTarget.pk_ubigeo;

                this._geografiaService.cargarGeografia(0)
                        .subscribe((paises:any)=>{
                          this.pais=geo.pk_pais;
                          this.listaPais=Object.values(paises);
                          this._geografiaService.cargarGeografia(this.pais)
                              .subscribe((provincias:any)=>{
                                this.provincia=geo.pk_provincia;
                                this.listaProvincia=Object.values(provincias);
                                this._geografiaService.cargarGeografia(this.provincia)
                                    .subscribe((ciudades:any)=>{
                                      this.ciudad=geo.pk_ciudad;
                                      this.listaCiudad=Object.values(ciudades);
                                      this._geografiaService.cargarGeografia(this.ciudad)
                                          .subscribe((parroquias:any)=>{
                                            
                                            this.listaParroquia=Object.values(parroquias);
                                            this.cargando_tabla=false;
                                          })
                                    })
                              })
                        }) 
                
              });
            }else if(ubicacion.tipo_ubigeo === 'P'){
              this._geografiaService.cargarGeografiaProvincia(this.personaTarget.pk_ubigeo)
              .subscribe((geo:any)=>{
                this.pais=geo.pk_pais;
                this.provincia=geo.pk_provincia;
                this._geografiaService.cargarGeografia(0)
                        .subscribe((paises:any)=>{
                          this.pais=geo.pk_pais;
                          this.listaPais=Object.values(paises);
                         this._geografiaService.cargarGeografia(this.pais)
                              .subscribe((provincias:any)=>{
                                this.provincia=geo.pk_provincia;
                                this.listaProvincia=Object.values(provincias);
                                this._geografiaService.cargarGeografia(geo.pk_provincia)
                                    .subscribe((ciudades:any)=>{
                                      this.listaCiudad=Object.values(ciudades);
                                      this.cargando_tabla=false;
                                     
                                    })
                              })
                        })
                
              });
            }else if(ubicacion.tipo_ubigeo === 'N'){
              
              this.pais=this.personaTarget.pk_ubigeo;
              this._geografiaService.cargarGeografia(0)
              .subscribe((paises:any)=>{
                this.listaPais=Object.values(paises);
                this._geografiaService.cargarGeografia(this.pais)
                    .subscribe((provincias:any)=>{
                      this.listaProvincia=Object.values(provincias);
                     
                    })
              })
             
            }


          });
    } else{
      this._geografiaService.cargarGeografia(0)
          .subscribe((paises)=>{
            this.listaPais=Object.values(paises);
          });
      this.pais=null;
      this.provincia=null;
      this.ciudad=null;
      this.parroquia=null;
    }
  }

  cargarTipoIdentificacion(){
    this.cargando_tabla=true;
    this._tipoIdentificacionService.cargarDatos()
    .subscribe((datos:any)=>{
      this.listaTipoIdentificacion=Object.values(datos);
      this.cargando_tabla=false;
    })
  }

  cargarNivelEducacion(){
    this.cargando_tabla=true;
    this._nivelEducacionService.cargarDatos()
    .subscribe((datos:any)=>{
      this.listaNivelEducacion=Object.values(datos);
      this.cargando_tabla=false;
    })
  }

  cargarProfesiones(){
    this.cargando_tabla=true;
    this._profesionService.cargarDatos()
    .subscribe((datos:any)=>{
      this.listaProfesiones=Object.values(datos);
      this.cargando_tabla=false;
    })
  }

  validarTipoDocumento(event){
    console.log(event)
    if(this.tipoDoc === 'CÉDULA'){
      this._personaService.validarCedula(this.personaTarget.numidentificacion_person)
          .subscribe((resp:any)=>{
            if(resp.mensaje.status === 'ok'){
              this.toast.fire({
                type: 'success',
                title: 'Cédula correcta'
              })

           
              this._personaService.cargarDatosNumDoc(this.personaTarget.numidentificacion_person)
                  .subscribe((per:any)=>{
                    this.personaTarget=per;
                    this.personaTarget.fechanac_person=moment(per.fechanac_person).format('YYYY-MM-DD');
                    this.cargarUbicaciones(per);
                    this.toast.fire({
                      type: 'success',
                      title: 'Cargado información de Persona'
                    })
                    this.onPersonaTargetChange();
                  });
            

            }else{
              this.toast.fire({
                type: 'error',
                title: 'Cédula incorrecta'
              })
            }
          });
    }
  }

  onChangeTipDoc(event:any){
    this.tipoDoc=event.nombre_tipiden;
  }

}


export interface personaModel{
  pk_person:number,
  pk_tipiden:number,
  numidentificacion_person:string,
  nombres_person:string,
  apellidos_person:string,
  estadocivil_person:string,
  sexo_person:string,
  telefono_person:string,
  celular_person:string,
  correo_person:string,
  pk_ubigeo:number,
  fechanac_person:any,
  direccion_person:string ,
  pk_nivedu:number,
  pk_prof:number,
  ocupacion_person:string ,
  audit_creacion:any,
  audit_modificacion:any
  

}
