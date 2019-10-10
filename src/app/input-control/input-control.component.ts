import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControlComponent),
      multi: true
    }
  ]
})
export class InputControlComponent implements OnInit, ControlValueAccessor {
  @Input() myLabel: string = '';
  counter: number = 0;

  @ViewChild('textInput', { static: false }) textInput: ElementRef;

  value: string;
  isDisabled: boolean;
  onChange = (_: any) => {};
  onTouch = () => {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  onInput(value: string) {
    this.counter = value.length;
    this.value = value;

    this.onChange(this.value);
  }

  ontouched() {
    this.onTouch();
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
      this.counter = value.length;
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // setDisabledState(isDisabled: boolean): void {
  //   this.isDisabled = isDisabled;
  // }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.renderer.addClass(this.textInput.nativeElement, 'pink');
      this.renderer.setAttribute(
        this.textInput.nativeElement,
        'disabled',
        'true'
      );
    } else {
      this.renderer.removeClass(this.textInput.nativeElement, 'pink');
      this.renderer.removeAttribute(this.textInput.nativeElement, 'disabled');
    }
  }
}
