import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-combo-empresa',
  templateUrl: './combo-empresa.component.html',
  styleUrls: ['./combo-empresa.component.scss']
})
export class ComboEmpresaComponent implements OnInit, ControlValueAccessor {
  @Output() selectElement: EventEmitter<any>;
  myForm: FormGroup;

  onChange = (_: any) => {};
  onTouch = () => {};

  constructor() {
    this.myForm = new FormGroup({
      user: new FormControl('')
    });
    this.selectElement = new EventEmitter<any>();
  }

  ngOnInit() {}

  onSelect(event) {
    this.onChange(event.value);
    this.selectElement.emit({ event });
  }

  writeValue(value: any): void {
    this.myForm.patchValue({
      user: value
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
