import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDivider } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RoundIconComponent } from '@shared/components/round-icon/round-icon.component';
import { CustomCardComponent } from '@shared/components/custom-card/custom-card.component';
import { DatePipe } from '@angular/common';

interface GameEntry {
  username: string;
  moves: number;
  date: Date;
  result: 'Won' | 'Lost' | 'Draw';
}

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    MatDivider,
    MatTableModule,
    RoundIconComponent,
    CustomCardComponent,
    DatePipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  $username = signal<string | undefined>(undefined);
  $gameHistory = signal<GameEntry[]>([]);

  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    const username = this._route.snapshot.paramMap.get('username');
    if (username) {
      this.$username.set(username);
    } else {
      //  TODO handle this case
    }

    this.$gameHistory.set([
      {
        date: new Date(),
        moves: 65,
        result: 'Won',
        username: 'Fupenzi',
      },
      {
        date: new Date(),
        moves: 35,
        result: 'Lost',
        username: '--upenzi',
      },
      {
        date: new Date(),
        moves: 35,
        result: 'Draw',
        username: '--upenzi',
      },
    ]);
  }
}
