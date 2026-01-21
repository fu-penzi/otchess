import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessGameComponent } from './chess-game.component';

describe('ChessBoard', () => {
  let component: ChessGameComponent;
  let fixture: ComponentFixture<ChessGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChessGameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
