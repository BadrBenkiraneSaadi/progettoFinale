import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModficaFatturaComponent } from './modfica-fattura.component';

describe('ModficaFatturaComponent', () => {
  let component: ModficaFatturaComponent;
  let fixture: ComponentFixture<ModficaFatturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModficaFatturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModficaFatturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
