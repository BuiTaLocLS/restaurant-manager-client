import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { DataService } from './services/data.service';
import { Restaurant } from './models/restaurant.model';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
