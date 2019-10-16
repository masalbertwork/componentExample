import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Optional,
  Self,
  ChangeDetectorRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NgControl
} from '@angular/forms';

@Component({
  selector: 'app-combo-empresa',
  templateUrl: './combo-empresa.component.html',
  styleUrls: ['./combo-empresa.component.scss']
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

  constructor(
    private cd: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.myForm = new FormGroup({
      user: new FormControl('')
    });
    this.selectElement = new EventEmitter<any>();
    this.noSelectElement = new EventEmitter<any>();

    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  onSelect(event) {
    this.onChange(event.value);
    this.selectElement.emit({ event });
  }

  noSelect(event) {}

  delete(event) {
    this.onChange(null);
    this.writeValue(null);
  }

  tocat(event) {
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

  refrescValidacio() {
    this.ngControl.control.setErrors({ invalid: true });
  }
}
