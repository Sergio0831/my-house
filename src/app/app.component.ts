import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-house';
  isSideNavOpen = false;

  openSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }
}
