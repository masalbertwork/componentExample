import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboEmpresaComponent } from './combo-empresa.component';

describe('ComboEmpresaComponent', () => {
  let component: ComboEmpresaComponent;
  let fixture: ComponentFixture<ComboEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
