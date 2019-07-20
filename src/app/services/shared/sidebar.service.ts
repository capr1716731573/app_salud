import { Injectable } from '@angular/core';
import { MenuPerfilService } from '../menu-perfil.service';
import { SettingsService } from '../settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

import swal from 'sweetalert2';

@Injectable()
export class SidebarService {

  menu:any[]=[];
  constructor(public _menuPerfilService:MenuPerfilService,
              public _settingsService:SettingsService) {
    
   }

   cargarMenu(){
     this._menuPerfilService.cargarDatos(1)
         .subscribe((menus_datos:any)=>{
            this.menu=Object.values(menus_datos);
            
         });
   }

}
