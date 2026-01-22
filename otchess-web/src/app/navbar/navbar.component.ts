import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UrlEnum } from '@app/app.routes';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatIconModule, MatAnchor, MatButton],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private _router = inject(Router);

  goToLogin(): void {
    this._router.navigateByUrl(UrlEnum.LOGIN);
  }
}
