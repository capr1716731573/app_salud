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
export class RegionesTipoExamenService {
  url:string=dominio_ws+'/region_tipo_examen';
  tabla:string='Regiones Tipo Examen ';

  constructor(public http:HttpClient,
              public _settingsService:SettingsService) { }

  cargarDatos(pk_tipexa:number){
    let url_ws=`${this.url}/${pk_tipexa}`;
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

 
  cargarDatosID(pk_regexa:number,pk_tipexa:number, ):Observable<any>{
    let url_ws=`${this.url}/${pk_regexa}/${pk_tipexa}`;
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