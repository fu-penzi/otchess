import { Component, input } from '@angular/core';
import { MatDivider } from '@angular/material/list';

@Component({
  selector: 'app-custom-card',
  imports: [MatDivider],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.scss',
})
export class CustomCardComponent {
  showDivider = input<boolean>(true);
}
