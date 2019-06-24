import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../services/settings/settings.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VerificarTokenGuard implements CanActivate {
  token:any;
  dominio:string;
  constructor(public _settingService:SettingsService,
    public router:Router,
    public activatedRoute:ActivatedRoute) { 
      
    }

  canActivate(): Promise<boolean> | boolean {
    
     //Obtengo el token del servicio settings service
     this.token=this._settingService.myToken;
     let tokenValido=this._settingService.validarExpiracionToken(this.token);

    //verificar si ya espiro el token
     if (tokenValido === true) {
      console.log('Guard Navegacion: Token Valido, '+tokenValido);
      return true;
      
    }else{
      console.log('Guard Navegacion: Token Expiro, '+tokenValido);
      //this.document.location.href = 'http://localhost/sgh';
      this.router.navigate(['/login']);
      return false; 
    }

  }
  
}
