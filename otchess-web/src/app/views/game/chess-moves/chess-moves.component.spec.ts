import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessMovesComponent } from './chess-moves.component';

describe('ChessMovesComponent', () => {
  let component: ChessMovesComponent;
  let fixture: ComponentFixture<ChessMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessMovesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChessMovesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
