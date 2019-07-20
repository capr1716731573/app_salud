import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

import { dominio_ws } from '../config/configuraciones_globales';
import { SettingsService } from './settings/settings.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MenuPerfilService {
  url:string=dominio_ws+'/menu_perfil';
  tabla:string='Menu-Perfil';

  constructor(public http:HttpClient,
              public _settingsService:SettingsService) { }

  cargarDatos(perfil:number){
    let url_ws=`${this.url}/${perfil}`;
    return this.http.get(url_ws)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service Obtener ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          `Error no controlado ${this.tabla}`,
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log(`Error no controlado - Service Obtener ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }
  
  cargarMenu(user:number){
    let url_ws=`${this.url}/byUser/${user}`;
    return this.http.get(url_ws)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service Obtener ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp.data;
          console.log("tamano mensaje "+dato[0].mensaje[2].items_menu.length);
         for(let i=0; i < dato[0].mensaje.length; i++){            
            let contador=0;
            let item=dato[0].mensaje[i];
            for(let j=0; j < item.items_menu.length ; j++){
              if(item.items_menu[j].asignado_perfil) contador+=1;
              //console.log("item["+j+"]="+item.items_menu[j].asignado_perfil)
            }
            item.num_items_activos=contador;
          }
          
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          `Error no controlado ${this.tabla}`,
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log(`Error no controlado - Service Obtener ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }


  crud(opcion:string,json:any):Observable<any>{
    let url_ws=`${this.url}`;
    return this.http.post(url_ws,{opcion:opcion,json:json})
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service CRUD ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp.respuesta;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          `Error no controlado ${this.tabla} CRUD`,
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log(`Error no controlado - Service CRUD ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }
}