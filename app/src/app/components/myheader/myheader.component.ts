import { RouteGuardService } from 'src/app/services/route-guard.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-myheader',
  templateUrl: './myheader.component.html',
  styleUrls: ['./myheader.component.css']
})
export class MyheaderComponent implements OnInit {
  constructor(private RouteGard:RouteGuardService) { }

  ngOnInit(): void {
  }

  logout(){
    this.RouteGard.setLogin();
  }

}
