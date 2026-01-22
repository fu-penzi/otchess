import { Component, input } from '@angular/core';
import { RoundIconComponent } from '@shared/components/round-icon/round-icon.component';

@Component({
  selector: 'app-player-info',
  imports: [RoundIconComponent],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.scss',
})
export class PlayerInfoComponent {
  name = input<string>();
  imageSrc = input<string>();
}
