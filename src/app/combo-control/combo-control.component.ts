import {
  Component,
  OnInit,
  forwardRef,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  DoCheck,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Optional,
  Self
} from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS
} from '@angular/forms';

@Component({
  selector: 'app-combo-control',
  templateUrl: './combo-control.component.html',
  styleUrls: ['./combo-control.component.scss'],
  providers: [
    //   {
    //     provide: NG_VALUE_ACCESSOR,
    //     useExisting: forwardRef(() => ComboControlComponent),
    //     multi: true
    //   },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => ComboControlComponent),
    //   multi: true
    // }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComboControlComponent
  implements OnInit, ControlValueAccessor, DoCheck, Validator {
  selectedValue: string;
  selectedOption: any;
  states: any[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' },
    { id: 3, name: 'Arizona', region: 'West' },
    { id: 4, name: 'Arkansas', region: 'South' },
    { id: 5, name: 'California', region: 'West' },
    { id: 6, name: 'Colorado', region: 'West' },
    { id: 7, name: 'Connecticut', region: 'Northeast' },
    { id: 8, name: 'Delaware', region: 'South' },
    { id: 9, name: 'Florida', region: 'South' },
    { id: 10, name: 'Georgia', region: 'South' },
    { id: 11, name: 'Hawaii', region: 'West' },
    { id: 12, name: 'Idaho', region: 'West' },
    { id: 13, name: 'Illinois', region: 'Midwest' },
    { id: 14, name: 'Indiana', region: 'Midwest' },
    { id: 15, name: 'Iowa', region: 'Midwest' },
    { id: 16, name: 'Kansas', region: 'Midwest' },
    { id: 17, name: 'Kentucky', region: 'South' },
    { id: 18, name: 'Louisiana', region: 'South' },
    { id: 19, name: 'Maine', region: 'Northeast' },
    { id: 21, name: 'Maryland', region: 'South' },
    { id: 22, name: 'Massachusetts', region: 'Northeast' },
    { id: 23, name: 'Michigan', region: 'Midwest' },
    { id: 24, name: 'Minnesota', region: 'Midwest' },
    { id: 25, name: 'Mississippi', region: 'South' },
    { id: 26, name: 'Missouri', region: 'Midwest' },
    { id: 27, name: 'Montana', region: 'West' },
    { id: 28, name: 'Nebraska', region: 'Midwest' },
    { id: 29, name: 'Nevada', region: 'West' },
    { id: 30, name: 'New Hampshire', region: 'Northeast' },
    { id: 31, name: 'New Jersey', region: 'Northeast' },
    { id: 32, name: 'New Mexico', region: 'West' },
    { id: 33, name: 'New York', region: 'Northeast' },
    { id: 34, name: 'North Dakota', region: 'Midwest' },
    { id: 35, name: 'North Carolina', region: 'South' },
    { id: 36, name: 'Ohio', region: 'Midwest' },
    { id: 37, name: 'Oklahoma', region: 'South' },
    { id: 38, name: 'Oregon', region: 'West' },
    { id: 39, name: 'Pennsylvania', region: 'Northeast' },
    { id: 40, name: 'Rhode Island', region: 'Northeast' },
    { id: 41, name: 'South Carolina', region: 'South' },
    { id: 42, name: 'South Dakota', region: 'Midwest' },
    { id: 43, name: 'Tennessee', region: 'South' },
    { id: 44, name: 'Texas', region: 'South' },
    { id: 45, name: 'Utah', region: 'West' },
    { id: 46, name: 'Vermont', region: 'Northeast' },
    { id: 47, name: 'Virginia', region: 'South' },
    { id: 48, name: 'Washington', region: 'South' },
    { id: 49, name: 'West Virginia', region: 'South' },
    { id: 50, name: 'Wisconsin', region: 'Midwest' },
    { id: 51, name: 'Wyoming', region: 'West' }
  ];
  noResult: boolean;
  isDisabled: boolean;
  emmitdelete: boolean;

  @Output() selectElement: EventEmitter<any>;
  @Output() noSelectElement: EventEmitter<any>;
  @Output() focusElement: EventEmitter<any>;
  @Output() deleteElement: EventEmitter<any>;
  @Output() validaElement: EventEmitter<any>;
  onChange = (_: any) => {};
  onTouch = () => {};

  constructor(
    private cd: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.selectElement = new EventEmitter<any>();
    this.noSelectElement = new EventEmitter<any>();
    this.focusElement = new EventEmitter<any>();
    this.deleteElement = new EventEmitter<any>();
    this.validaElement = new EventEmitter<any>();

    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.emmitdelete = false;
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.onChange(event.value);
    this.selectElement.emit(event);
    this.emmitdelete = false;
    // this.cd.detectChanges();
    this.cd.markForCheck();
  }

  typeaheadNoResults(event: boolean): void {
    // if (event && this.selectedValue.length >= 3) {
    this.noResult = event;
    // this.onChange(null);
    this.noSelectElement.emit(null);
    // this.writeValue(null);
    // }
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedOption = value || '';
    } else {
      this.selectedOption = null;
      this.selectedValue = null;
    }
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control) {
      // this.control = control;
    }

    // if (this.control && this.input) {
    // this.input.control.setValidators(this.control.validator);
    // }

    if (control.value === 'qqq') {
      return { error: 'Inner error:The value is 1' };
    }

    return null;
  }

  tocat(evt: Event) {
    console.log(`touched`);
    this.onTouch();
    this.focusElement.emit(this.selectedValue);
  }

  blur(evt) {
    console.log(`blur`);
    if (
      this.selectedOption &&
      evt.currentTarget.value === this.selectedOption.name
    ) {
      this.onChange(this.selectedValue);
    } else {
      this.selectedOption = null;
      this.selectedValue = null;
      this.onChange(null);
      this.ngControl.control.setErrors({ invalid: true });
      this.validaElement.emit();
    }
  }
  canvi(evt) {
    console.log(`canvi:${evt.currentTarget.value}`);
    if (
      this.selectedOption &&
      evt.currentTarget.value === this.selectedOption.name
    ) {
      this.onChange(this.selectedValue);
    } else {
      this.selectedOption = null;
      this.selectedValue = null;
      this.onChange(null);
      // this.ngControl.control.setErrors({ valid: false });
      this.ngControl.control.setErrors({ invalid: true });
      this.validaElement.emit();
    }
  }

  marxem(event) {
    this.onChange(this.selectedValue);
  }

  ngDoCheck() {
    if (this.selectedValue === '') {
      if (!this.emmitdelete) {
        this.emmitdelete = true;
        this.deleteElement.emit({ event: 'deleteElement', object: null });
      }
    }
  }
}
