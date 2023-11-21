import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssDinamicoComponent } from './css-dinamico.component';

describe('CssDinamicoComponent', () => {
  let component: CssDinamicoComponent;
  let fixture: ComponentFixture<CssDinamicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssDinamicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssDinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
