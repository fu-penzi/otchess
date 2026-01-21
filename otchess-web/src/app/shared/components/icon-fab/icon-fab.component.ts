import { Component, input } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-icon-fab',
  imports: [MatFabButton, MatIcon],
  templateUrl: './icon-fab.component.html',
  styleUrl: './icon-fab.component.scss',
})
export class IconFabComponent {
  iconSrc = input<string>();
  matIcon = input<string>();

  label = input<string>('');
  secondaryText = input<string>('');
}
