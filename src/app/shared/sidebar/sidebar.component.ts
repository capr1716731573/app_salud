import { Component, OnInit } from '@angular/core';
import { MenuPerfilService } from '../../services/menu-perfil.service';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menu_system:any[]=[];
  constructor(public _menuPerfilService:MenuPerfilService,
              public _settingsService:SettingsService) { 
    
  }

  ngOnInit() {
    
   
  }

  

}
