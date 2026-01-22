import { Component, signal } from '@angular/core';
import { CustomCardComponent } from '@shared/components/custom-card/custom-card.component';
import { RoundIconComponent } from '@shared/components/round-icon/round-icon.component';

interface Player {
  username: string;
  wins: number;
  losses: number;
  draws: number;
}
@Component({
  selector: 'app-leaderboards',
  imports: [CustomCardComponent, RoundIconComponent],
  templateUrl: './leaderboards.component.html',
  styleUrl: './leaderboards.component.scss',
})
export class LeaderboardsComponent {
  // TODO remove mock
  $players = signal<Player[]>([
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
    { username: 'Fupenzi', wins: 123, losses: 122, draws: 10 },
  ]);
}
