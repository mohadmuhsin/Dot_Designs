import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  isSidebarHidden: boolean = false;
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
