import { Component, input } from '@angular/core';

@Component({
  selector: 'app-round-icon',
  imports: [],
  templateUrl: './round-icon.component.html',
  styleUrl: './round-icon.component.scss',
})
export class RoundIconComponent {
  imgSrc = input<string | undefined>('');
}
