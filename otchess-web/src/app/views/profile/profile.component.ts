import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDivider } from '@angular/material/list';

@Component({
  selector: 'app-profile',
  imports: [MatCard, MatCardContent, MatCardHeader, ReactiveFormsModule, MatDivider],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  $username = signal<string | undefined>(undefined);

  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    const username = this._route.snapshot.paramMap.get('username');
    if (username) {
      this.$username.set(username);
    } else {
      //  TODO handle this case
    }
  }
}
