import { AfterViewChecked, Component} from '@angular/core';
import { RouteGuardService } from './services/route-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  log:boolean = this.RouteGard.getLogin();

  constructor(private RouteGard:RouteGuardService) { }

  ngAfterViewChecked() {
    this.log=this.RouteGard.getLogin();
    console.log(this.log);
  }
  
}
