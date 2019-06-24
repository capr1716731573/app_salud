import { Component, OnInit } from '@angular/core';
import { SidebarService } from "./../../services/services.index";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService) { }

  ngOnInit() {
  }

}
