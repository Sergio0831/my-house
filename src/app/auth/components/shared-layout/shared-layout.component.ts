import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-layout',
  templateUrl: './shared-layout.component.html',
  styleUrls: ['./shared-layout.component.scss'],
})
export class SharedLayoutComponent {
  @Input() imageSrc: string = '';
}
