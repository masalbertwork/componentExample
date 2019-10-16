import {
  Component,
  OnInit,
  forwardRef,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  ControlValueAccessor,
  Validator,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NgControl,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-combo1',
  templateUrl: './combo1.component.html',
  styleUrls: ['./combo1.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Combo1Component),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => Combo1Component),
      multi: true
    }
  ]
})
export class Combo1Component
  implements ControlValueAccessor, Validator, AfterViewInit {
  value: any;
  class: any;
  onChange;
  onTouched;
  control;
  @ViewChild('input', { static: false, read: NgControl }) input;
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {
    this.validate(null);
  }
  change(value: any) {
    this.value = value;
    this.onChange(value);
  }
  blur() {
    this.onTouched();
  }
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.control) {
      this.control = control;
    }
    if (this.control && this.input) {
      this.input.control.setValidators(this.control.validator);
    }
    if (control && control.value === 'qqq') {
      return { error: 'Inner error:The value is 1' };
    }
    return null;
  }
}
