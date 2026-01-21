import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatDivider } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlEnum } from '@app/app.routes';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatDivider,
    MatInputModule,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  ngOnInit(): void {
    this.form = this._fb.group({
      login: '',
      password: '',
    });
  }

  signIn(): void {
    console.log(this.form.value);
  }

  goToRegister(): void {
    this._router.navigateByUrl(UrlEnum.REGISTER);
  }
}
