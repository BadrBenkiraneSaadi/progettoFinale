import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModficaClienteComponent } from './modfica-cliente.component';

describe('ModficaClienteComponent', () => {
  let component: ModficaClienteComponent;
  let fixture: ComponentFixture<ModficaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModficaClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModficaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
