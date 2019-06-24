import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

import swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  cargando_tabla:boolean=true;
  cargando_accion:boolean=false;
  listaUsuarios:any[]=[];
  desde:number=0;
  totalRegistros:number=0;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  usuariosTarget:any={
    pk_cie:null,
    nombre_cie:null,
    codigo_cie:null,
    estado_cie:null,
    audit_creacion:null,
    audit_modificacion:null
  }
  constructor( public _usuarioService:UsuarioService,
               public _settingsService:SettingsService,
               public router:Router) { }

  ngOnInit() { 
    this.cargarAll();
    
  }

  cargarAll(){
    this._usuarioService.cargarDatos(this.desde)
        .subscribe((datos:any)=>{
          this.listaUsuarios=Object.values(datos);
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
      this.listaUsuarios=[];
      if(termino.length <= 0){
        this.cargando_tabla=true;
        this.desde=0;
        this.cargarAll();
      }else if(termino.length >= 3){
      this.cargando_tabla=true;
      this._usuarioService.cargarDatosBusqueda(termino)
          .subscribe( (datos:any) => {
            this.listaUsuarios=datos;
            this.cargando_tabla=false;
          })
      }else{
        this.listaUsuarios=this.listaUsuarios;
        this.cargando_tabla=false;
      }
    }

    editar(id:number){
      this.router.navigate(['usuario',id]);
    }

    insertar(){
      this.router.navigate(['usuario','nuevo']);
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
          this._usuarioService.crud('D',row)
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