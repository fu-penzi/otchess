import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatIconModule, MatIconButton, MatAnchor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
