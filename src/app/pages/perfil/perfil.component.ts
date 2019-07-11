import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import swal from 'sweetalert2';
import { MenuPerfilService } from '../../services/menu-perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  cargando_tabla:boolean=true;
  cargando_menu:boolean=true;
  listaPerfil:any[]=[];
  listaMenuPerfil:any[]=[];
  menuPerfilTarget:any={
    pk_menu:null,
    pk_perfil:null
  };
    //MENSAJES TOAST
    toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  perfilTarget:any;
  //para el nuevo registro, los campos varian de acuerdo a la tabla que estas
  new_row:any={
    pk_perfil:null,
    nombre_perfil:null
  }
  constructor( public _perfilService:PerfilService,
               public _menuPerfilService:MenuPerfilService) { }

  ngOnInit() { 
    this.cargarAll();
  }

  cargarAll(){
    this._perfilService.cargarDatos()
        .subscribe((datos:any)=>{
          this.listaPerfil=Object.values(datos);
          console.log(datos);
          this.cargando_tabla=false;
        })
  }

  cargarMenuPerfil(perfil:any){    
    this.perfilTarget=perfil;
    this.cargando_menu=true;
    console.log(JSON.stringify(this.perfilTarget));
    this._menuPerfilService.cargarDatos(perfil.pk_perfil)
        .subscribe((datos:any)=>{
          this.listaMenuPerfil=Object.values(datos[0].mensaje);
          console.log("MENU "+JSON.stringify(this.listaMenuPerfil));
          this.cargando_menu=false;
        })
  }

  async editar(row:any){
    	
    const {value: nombre} = await swal.fire({
      title: 'Ingrese la nueva descripción',
      input: 'text',
      inputValue: row.nombre_perfil,
      inputPlaceholder: row.nombre_perfil
    })
    
    if (nombre && nombre.length > 0) {
      row.nombre_perfil=nombre;
      this._perfilService.crud('U',row)
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
      row.pk_perfil=0;
      row.nombre_perfil=nombre;
      
      console.log('ron nombre es : '+JSON.stringify(row));
      this._perfilService.crud('I',row)
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
          this._perfilService.crud('D',row)
              .subscribe((resp:any) => {
                this.cargarAll();
                swal.fire(`Registro Eliminado!!`)
              });
        }
      })
      
    }

    actualizarItemMenuPerfil(item){
      let item_new:any;
      if(item.asignado_perfil){
        console.error(JSON.stringify(item));
        console.log("ELIMINAR ITEM: MENU"+item.pk_menu+" - PERFIL: "+this.perfilTarget.pk_perfil+" - MENUPERFIL: "+item.pk_menuperfil);
        item_new={
          pk_menuperfil:item.pk_menuperfil,
          pk_perfil:this.perfilTarget.pk_perfil,
          pk_menu:item.pk_menu
        };
        this._menuPerfilService.crud('D',item_new).subscribe((resp:any)=>{
          this.toast.fire({
            type: 'error',
            title: `Desactivado Item "${item.nombre_menu}" de perfil "${this.perfilTarget.nombre_perfil}"`
          })
        });

      }else{
        console.log("INSERTAR ITEM: MENU"+item.pk_menu+" - PERFIL: "+this.perfilTarget.pk_perfil);
        item_new={
          pk_perfil:this.perfilTarget.pk_perfil,
          pk_menu:item.pk_menu
        };
        this._menuPerfilService.crud('I',item_new).subscribe((resp:any)=>{
          this.toast.fire({
            type: 'success',
            title: `Activado Item "${item.nombre_menu}" de perfil "${this.perfilTarget.nombre_perfil}"`
          })
        });

      }
      
      
    }
}
