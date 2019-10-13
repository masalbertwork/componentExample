import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboControlComponent } from './combo-control.component';

describe('ComboControlComponent', () => {
  let component: ComboControlComponent;
  let fixture: ComponentFixture<ComboControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
