import { Component, OnInit } from '@angular/core';
import { SharedDataServiceService } from '../shared-data-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarHidden: boolean = false;
  isSettingsPanelOpen :boolean = true
  isSidebarOpen:boolean = false
  currentSidebarTab!:boolean 
  isOpen: boolean = false
   count!:any

  constructor(private service: AuthServiceService) { }
  ngOnInit(): void {

   this.getConsultationCount()
  }


  $nextTick() { }
  
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  getConsultationCount() {
   const token =  localStorage.getItem("designer")
    this.service.getConsultationCount(token).subscribe((res:any) => {
      console.log(res);
      
      this.count = res.count
    })
  }

 
}
