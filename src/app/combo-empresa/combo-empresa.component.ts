import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
  Optional,
  Self,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  Validator
} from '@angular/forms';

@Component({
  selector: 'app-combo-empresa',
  templateUrl: './combo-empresa.component.html',
  styleUrls: ['./combo-empresa.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => ComboEmpresaComponent),
  //     multi: true
  //   },
  //   {
  //     provide: NG_VALIDATORS,
  //     useExisting: forwardRef(() => ComboEmpresaComponent),
  //     multi: true
  //   }
  // ]
})
export class ComboEmpresaComponent
  implements OnInit, ControlValueAccessor, AfterViewInit {
  @Output() selectElement: EventEmitter<any>;
  @Output() noSelectElement: EventEmitter<any>;
  myForm: FormGroup;
  selectedValue: string;
  selectedOption: any;
  noResult: boolean;
  isDisabled: boolean;
  // @ViewChild('combo', { static: false, read: NgControl }) combo;

  onChange = (_: any) => {};
  onTouch = () => {};
  // control;

  constructor(
    private cd: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl
  ) {
    // private cdr: ChangeDetectorRef
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

  ngAfterViewInit() {
    // this.validate(null);
  }

  onSelect(event) {
    this.onChange(event.value);
    this.selectElement.emit({ event });
    // this.validate(this.myForm.get('user'));
  }

  noSelect(event) {
    // this.onChange(null);
    // this.writeValue(null);
    // this.noSelectElement.emit({ event });
  }

  delete(event) {
    // this.myForm.reset();
    this.onChange(null);
    this.writeValue(null);
  }

  tocat(event) {
    console.log('tocat' + event);
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

  // validate(control: AbstractControl): ValidationErrors | null {
  //   const errors = this.myForm.get('user').errors;
  //   if (errors) {
  //     return { invalid: true };
  //   } else {
  //     this.myForm.setErrors(null);
  //   }
  //   return null;
  // }

  refrescValidacio() {
    console.log('HI HA ERROR!!');
    this.ngControl.control.setErrors({ invalid: true });
    // this.myForm.reset();
    // this.cdr.markForCheck();
  }
}
