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
export class GeografiaService {
  url:string=dominio_ws+'/geografia';
  constructor(public http:HttpClient,
              public _settingsService:SettingsService) { }

  cargarGeografia(padre:number){
    let url_geografia=`${this.url}/${padre}`;
    return this.http.get(url_geografia)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log('Error - Service Obtener Geografia: ',resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          'Error no controlado Geografia',
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log('Error no controlado - Service Obtener Geografia= '+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  } 

  cargarGeografiaBusqueda(padre:number,palabra:string){
    let url_geografia=`${this.url}/busqueda/${palabra}/${padre}`;
    return this.http.get(url_geografia)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log('Error - Service Obtener Geografia: ',resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          'Error no controlado Geografia',
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log('Error no controlado - Service Obtener Geografia= '+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }
  cargarGeografiaID(pk_ubigeo:number):Observable<any>{
    let url_geografia=`${this.url}/ID/${pk_ubigeo}`;
    return this.http.get(url_geografia)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log('Error - Service Obtener Geografia: ',resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          'Error no controlado Geografia',
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log('Error no controlado - Service Obtener Geografia= '+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }

  cargarGeografiaParroquia(pk_ubigeo:number):Observable<any>{
    let url_geografia=`${this.url}/parroquia/${pk_ubigeo}`;
    return this.http.get(url_geografia)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log('Error - Service Obtener Geografia: ',resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          'Error no controlado Geografia',
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log('Error no controlado - Service Obtener Geografia= '+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }

  cargarGeografiaCiudad(pk_ubigeo:number):Observable<any>{
    let url_geografia=`${this.url}/ciudad/${pk_ubigeo}`;
    return this.http.get(url_geografia)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log('Error - Service Obtener Geografia: ',resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          'Error no controlado Geografia',
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log('Error no controlado - Service Obtener Geografia= '+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }

  cargarGeografiaProvincia(pk_ubigeo:number):Observable<any>{
    let url_geografia=`${this.url}/provincia/${pk_ubigeo}`;
    return this.http.get(url_geografia)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log('Error - Service Obtener Geografia: ',resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          'Error no controlado Geografia',
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log('Error no controlado - Service Obtener Geografia= '+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }

  crudGeografia(opcion:string,json:any):Observable<any>{
    let url_geografia=`${this.url}`;
    return this.http.post(url_geografia,{opcion:opcion,json:json})
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log('Error - Service CRUD Geografia: ',resp.message,'error')
          
        }else{
          dato=resp.respuesta;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          'Error no controlado Geografia CRUD',
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log('Error no controlado - Service CRUD Geografia= '+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }




  

}
