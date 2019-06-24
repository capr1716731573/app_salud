import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { dominio_ws } from '../config/configuraciones_globales';
import swal from 'sweetalert2'
import { SettingsService } from './settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string=dominio_ws;
  
  constructor(public http:HttpClient,
              public _settingsService:SettingsService,
              public router:Router) { }
   
 
    login(user,password){
      user={
        user:user,
        password:password
      }
     let url_login=this.url+'/login';
      return this.http.post(url_login,user)
      //return this.http.post(url_ins_hitoxproceso,{pk_proccontra:pk_proccontra},{headers:this.httpHeader, withCredentials:true})
      .pipe(map((resp:any) =>{
          let dato={};
          if(resp.status === 'error'){
           /*  swal('Error al ingresar al sistema: ',resp.message,'error'); */
            swal.fire({
              type: 'error',
              title: 'Error no controlado',
              text: 'Usuario o Clave Incorrecta',
              footer: resp.message
            })
            
          }else{
            this._settingsService.limpiarTokenUser();
            this._settingsService.crearTokenUsuarioLocalStorage(resp.token,resp.usuario);
            dato=resp;
           
           
          }
         
          return dato;
        }))
        .pipe(catchError( (err:any) =>{
          swal.fire({
            type: 'error',
            title: 'Error no controlado',
            text: 'Usuario o Clave Incorrecta',
            footer: 'Verificar log'
          })
          
          console.log("Error Login: "+JSON.stringify(err));
          return Observable.throw(err);
          
        }))
    }

    logout(){
      this._settingsService.limpiarTokenUser();
      this.router.navigate(['/login']);
    }
  
}
