import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfatturaComponent } from './newfattura.component';

describe('NewfatturaComponent', () => {
  let component: NewfatturaComponent;
  let fixture: ComponentFixture<NewfatturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfatturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfatturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
