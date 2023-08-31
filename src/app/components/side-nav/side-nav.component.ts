import { Component, OnInit } from '@angular/core';
import { slideInOut } from 'src/app/animations';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [slideInOut],
})
export class SideNavComponent {}
