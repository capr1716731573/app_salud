import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import swal from 'sweetalert2'
import { SettingsService } from '../services/settings/settings.service';

//DECLARAR UNA FUNCION DE UNARCHIVO JQUERY EN OTR ARCHIVO
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:string;
  pass:string;

  constructor( public router: Router,
               public _loginService: LoginService,
               public _settingsService:SettingsService
               ) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar(){
    let nombres_user;
    this._loginService.login(this.usuario,this.pass)
    .subscribe((resp:any) => {
      console.log(JSON.stringify(resp));
      //this._settingsService.crearTokenUsuarioLocalStorage(resp.token,resp.usuario);
      nombres_user=`${resp.usuario.nombres_person} ${resp.usuario.apellidos_person}`
      swal.fire(
        'Correcto',
        'Bienvenido al sistema '+nombres_user,
        'success'
      )
     
      //codigo para direccionar rutas asi como el routerlink en el html
      this.router.navigate([ '/dashboard' ]);
      //this.cargando=false;
    });
   
  }

}
