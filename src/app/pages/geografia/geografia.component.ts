import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeografiaService } from '../../services/geografia.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-geografia',
  templateUrl: './geografia.component.html',
  styles: []
})
export class GeografiaComponent implements OnInit {
  cargando_tabla:boolean=true;
  listaNaciones:any[]=[];
  listaProvincias:any[]=[];
  listaCiudades:any[]=[];
  listaParroquias:any[]=[];
  atributoListaGeografia:any[]=[];
  pais:any;
  provincia:any;
  ciudad:any;
  parroquia:any;
  tipo:string='N';
  titulo='Paises';
  constructor(public _geografiaService:GeografiaService) { }

  ngOnInit() {
    this.cargarPaises();
    
    //this.atributoListaGeografia=this.listaNaciones
  }


  cargarPaises(){
    this._geografiaService.cargarGeografia(0)
        .subscribe((paises:any)=>{
          this.listaNaciones=Object.values(paises);
          console.log(paises);
          this.atributoListaGeografia=this.listaNaciones;
          this.cargando_tabla=false;
        })
  }

  cargarProvincias(){
    
    if(this.pais){
      this._geografiaService.cargarGeografia(this.pais)
          .subscribe((provincias:any)=>{
            this.listaProvincias=[];
            this.listaCiudades=[];
            this.listaParroquias=[];
            this.provincia=this.ciudad=this.parroquia=null;
            this.listaProvincias=Object.values(provincias);
            this.atributoListaGeografia=[];
            this.titulo='Cargar Lista..';
            this.cargando_tabla=false;
          })
      }
      else{
        swal.fire(
          'Faltan Datos',
          'Debe seleccionar pais o el pais seleccioando no contiene datos.',
          'warning'
        )
      }
  }

  cargarCiudades(){
    
    if(this.provincia){
    this._geografiaService.cargarGeografia(this.provincia)
        .subscribe((ciudades:any)=>{
          this.listaCiudades=[];
          this.listaParroquias=[];
          this.ciudad=this.parroquia=null;
          this.listaCiudades=Object.values(ciudades);
          this.atributoListaGeografia=[];
          this.titulo='Cargar Lista..';
          this.cargando_tabla=false;
        })
      }
      else{
        swal.fire(
          'Faltan Datos',
          'Debe seleccionar provincia o el provincia seleccioando no contiene datos.',
          'warning'
        )
      }
  }

  cargarParroquias(){
    if(this.ciudad){
    this._geografiaService.cargarGeografia(this.ciudad)
        .subscribe((parroquias:any)=>{
          this.listaParroquias=[];
          this.parroquia=null;
          this.listaParroquias=Object.values(parroquias);
          this.atributoListaGeografia=[];
          this.titulo='Cargar Lista..';
          console.log("LISTA PARROQUIAS "+this.listaParroquias.length);
          this.cargando_tabla=false;
        })
      }
      else{
        this.cargando_tabla=true;
        this.atributoListaGeografia=[];
        this.cargando_tabla=false;
        swal.fire(
          'Faltan Datos',
          'Debe seleccionar ciudad o el ciudad seleccioando no contiene datos.',
          'warning'
        )
      }
  }

    cambiarTipo(parametroTipo){
      this.tipo=parametroTipo;      
      if(parametroTipo === 'N' ){        
        this.titulo='Paises';
        this.cargando_tabla=true;
        this.atributoListaGeografia=[];
        this.atributoListaGeografia=this.listaNaciones;
        this.cargando_tabla=false;
        //this.cargarPaises();
        
      }else if(parametroTipo === 'P' ){
        this.titulo='Provincias';
        if(this.pais ){
          this.cargando_tabla=true;
          this.atributoListaGeografia=[];
          this.atributoListaGeografia=this.listaProvincias;
          this.cargando_tabla=false;
        }else{
          this.cargando_tabla=true;
          this.atributoListaGeografia=[];
          this.cargando_tabla=false;
          swal.fire(
            'Faltan Datos',
            'Debe seleccionar pais o el pais seleccioando no contiene datos.',
            'warning'
          )
        }
        //this.cargarProvincias();
        
      }else if(parametroTipo === 'C' ){
        this.titulo='Ciudades';
        if(this.provincia){
          this.cargando_tabla=true;
          this.atributoListaGeografia=[];
          this.atributoListaGeografia=this.listaCiudades;
          this.cargando_tabla=false;
        //this.cargarCiudades();
        }else{
          this.cargando_tabla=true;
        this.atributoListaGeografia=[];
        this.cargando_tabla=false;
          swal.fire(
            'Faltan Datos',
            'Debe seleccionar provincia o el provincia seleccioando no contiene datos.',
            'warning'
          )}
        
      }else if(parametroTipo === 'PR' ){
        this.titulo='Parroquias';
        if(this.ciudad && (this.listaParroquias.length > 0)){
        this.cargando_tabla=true;
        this.atributoListaGeografia=[];
        this.atributoListaGeografia=this.listaParroquias;
        this.cargando_tabla=false;
        //this.cargarParroquias();
      }else{
        this.cargando_tabla=true;
        this.atributoListaGeografia=[];
        this.cargando_tabla=false;
        swal.fire(
          'Faltan Datos',
          'Debe seleccionar pais o el pais seleccioando no contiene datos.',
          'warning'
        )
        
    } 
  }}

 /*  cambiarPais(){
    this.listaProvincias=[];
    this.listaCiudades=[];
    this.listaParroquias=[];
    this.atributoListaGeografia=this.listaNaciones;
  }

  cambiarProvincia(){
    this.listaCiudades=[];
    this.listaParroquias=[];
    this.atributoListaGeografia=this.listaProvincias;
  }
  cambiarCiudad(){
    this.listaParroquias=[];
    this.atributoListaGeografia=this.listaCiudades;
  } */

  validarInsertar(tipo:any){
    const row:any={};
    
    if(tipo === 'N'){
      row.fk_padre=0;
      row.tipo_ubigeo='N';
      row.descripcion='PAÍS';
      row.nombre_ubigeo=null;
      this.insertar(row);
    }else if(tipo === 'P' && this.pais){
      row.fk_padre=this.pais.pk_ubigeo;
      row.tipo_ubigeo='P';
      row.descripcion='PROVINCIA';
      row.nombre_ubigeo=null;
      this.insertar(row);
    }else if(tipo === 'C' && this.provincia){
      row.fk_padre=this.provincia;
      row.tipo_ubigeo='C';
      row.descripcion='CIUDAD';
      row.nombre_ubigeo=null;
      this.insertar(row);
    }else if(tipo === 'PR' && this.ciudad){
      row.fk_padre=this.ciudad.pk_ubigeo;
      row.tipo_ubigeo='PR';
      row.descripcion='PARROQUIA';
      row.nombre_ubigeo=null;
      this.insertar(row);
    }else{
      swal.fire(
        'Faltan Datos',
        'Debe seleccionar a donde pertenece el nuevo dato',
        'warning'
      )
    }
  }

  async insertar(row:any){
    
      const {value: nombre} = await swal.fire({
      title: 'Ingrese nuevo registro: '+row.descripcion,
      input: 'text',
      inputValue: row.nombre_ubigeo,
      inputPlaceholder: 'Ingrese Aqui.'
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_ubigeo=nombre;
      console.log('ESTE ES EL NOMBRE = '+JSON.stringify(row));
      console.log('ESTE ES EL NOMBRE DE row.nombre_ubigeo= '+JSON.stringify(nombre));
      this._geografiaService.crudGeografia('I',row)
            .subscribe((resp:any) => {
              if(row.tipo_ubigeo === 'N'){ this.cargarPaises();}
              else if(row.tipo_ubigeo === 'P'){ this.cargarProvincias();}
              else if(row.tipo_ubigeo === 'C'){ this.cargarCiudades();}
              else if(row.tipo_ubigeo === 'PR'){ this.cargarParroquias();}
              this.cambiarTipo(row.tipo_ubigeo);
              swal.fire(`Registro Ingresado!!`)
            });
            console.log(this.tipo);
      }else{
        swal.fire(`Falta dato, registro no ingresado!!`)
      }
      
  }
  
  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_ubigeo,
      inputPlaceholder: row.nombre_ubigeo
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_ubigeo=nombre;
      this._geografiaService.crudGeografia('U',row)
            .subscribe((resp:any) => {
              if(row.tipo_ubigeo === 'N'){ this.cargarPaises();}
              else if(row.tipo_ubigeo === 'P'){ this.cargarProvincias();}
              else if(row.tipo_ubigeo === 'C'){ this.cargarCiudades();}
              else if(row.tipo_ubigeo === 'PR'){ this.cargarParroquias();}
              this.cambiarTipo(row.tipo_ubigeo);
              swal.fire(`Registro Actualizado!!`)
            });
            console.log(this.tipo);
      }else{
        swal.fire(`Falta dato, registro no actualizado!!`)
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
        this._geografiaService.crudGeografia('D',row)
            .subscribe((resp:any) => {
              if(row.tipo_ubigeo === 'N'){ this.cargarPaises();}
              else if(row.tipo_ubigeo === 'P'){ this.cargarProvincias();}
              else if(row.tipo_ubigeo === 'C'){ this.cargarCiudades();}
              else if(row.tipo_ubigeo === 'PR'){ this.cargarParroquias();}
              this.cambiarTipo(row.tipo_ubigeo);
              swal.fire(`Registro Eliminado!!`)
            });
            console.log(this.tipo);
      }
    })
    //alert(JSON.stringify(row));
  }
}
