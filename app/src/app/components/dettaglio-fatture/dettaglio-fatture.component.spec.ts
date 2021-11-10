import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioFattureComponent } from './dettaglio-fatture.component';

describe('DettaglioFattureComponent', () => {
  let component: DettaglioFattureComponent;
  let fixture: ComponentFixture<DettaglioFattureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioFattureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioFattureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
