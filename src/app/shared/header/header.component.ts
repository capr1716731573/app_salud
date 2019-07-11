import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  user:any={};

  constructor(public _loginService:LoginService,
              public _settignsService:SettingsService) { }

  ngOnInit() {
    this.user=this._settignsService.getInfoUser();
    console.log("DESDE CABECERA:  "+JSON.stringify(this.user));
  }


  logOut(){
    this._loginService.logout();
  }



}
