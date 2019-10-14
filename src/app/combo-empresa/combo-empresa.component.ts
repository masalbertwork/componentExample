import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-combo-empresa',
  templateUrl: './combo-empresa.component.html',
  styleUrls: ['./combo-empresa.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboEmpresaComponent),
      multi: true
    }
  ]
})
export class ComboEmpresaComponent implements OnInit, ControlValueAccessor {
  @Output() selectElement: EventEmitter<any>;
  @Output() noSelectElement: EventEmitter<any>;
  myForm: FormGroup;
  selectedValue: string;
  selectedOption: any;
  noResult: boolean;
  isDisabled: boolean;
  onChange = (_: any) => {};
  onTouch = () => {};

  constructor() {
    this.myForm = new FormGroup({
      user: new FormControl('')
    });
    this.selectElement = new EventEmitter<any>();
    this.noSelectElement = new EventEmitter<any>();
  }

  ngOnInit() {}

  onSelect(event) {
    this.onChange(event.value);
    this.selectElement.emit({ event });
  }

  noSelect(event) {
    this.onChange(null);
    this.writeValue(null);
    this.noSelectElement.emit({ event });
  }

  tocat(event) {
    console.log(event);
    this.onTouch();
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
