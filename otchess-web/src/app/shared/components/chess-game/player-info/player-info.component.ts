import { Component, input } from '@angular/core';

@Component({
  selector: 'app-player-info',
  imports: [],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.css',
})
export class PlayerInfoComponent {
  name = input<string>();
  imageSrc = input<string>();
}
