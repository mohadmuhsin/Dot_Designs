import { Component } from '@angular/core';
import { SharedDataServiceService } from '../shared-data-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarHidden: boolean = false;
  isSettingsPanelOpen :boolean = true
  isSidebarOpen:boolean = false
  currentSidebarTab!:boolean 
  isOpen:boolean = false
  $nextTick(){}
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
 
}
