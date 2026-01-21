import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFabComponent } from './icon-fab.component';

describe('IconFabComponent', () => {
  let component: IconFabComponent;
  let fixture: ComponentFixture<IconFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconFabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconFabComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
