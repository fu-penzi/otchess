import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundIconComponent } from './round-icon.component';

describe('RoundIconComponent', () => {
  let component: RoundIconComponent;
  let fixture: ComponentFixture<RoundIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundIconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
