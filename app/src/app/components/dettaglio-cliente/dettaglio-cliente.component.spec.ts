import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioClienteComponent } from './dettaglio-cliente.component';

describe('DettaglioClienteComponent', () => {
  let component: DettaglioClienteComponent;
  let fixture: ComponentFixture<DettaglioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
