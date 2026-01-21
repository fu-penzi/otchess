import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatDivider } from '@angular/material/list';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlEnum } from '@app/app.routes';

@Component({
  selector: 'app-register',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  ngOnInit(): void {
    this.form = this._fb.group({
      login: '',
      email: '',
      password: '',
    });
  }

  signUp(): void {
    console.log(this.form.value);
  }

  goToLogin(): void {
    this._router.navigateByUrl(UrlEnum.LOGIN);
  }
}
