import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pruebaForm: FormGroup;
  disabledVar: boolean;
  showDades: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.pruebaForm = this.fb.group({
      pruebaInput: new FormControl('Chao', [
        Validators.required,
        Validators.minLength(3)
      ]),
      empresa: new FormControl(null, [
        Validators.required,
        Validators.minLength(7)
      ]),
      pruebaCombo: new FormControl(null, [
        Validators.required,
        Validators.minLength(7)
      ]),
      prueba: new FormControl(null, [
        Validators.required,
        Validators.minLength(7)
      ]),
      prueba2: new FormControl(null, [
        Validators.required,
        Validators.minLength(7)
      ])
    });

    this.disabledVar = false;
  }

  onSelect(event): void {
    this.showDades = true;
    console.log(event);
  }

  noSelect(event): void {
    this.showDades = false;
    console.log(event);
  }

  remove() {
    this.pruebaForm.reset();
  }

  disa() {
    if (this.pruebaForm.get('pruebaInput').disabled) {
      this.pruebaForm.get('pruebaInput').enable();
    } else {
      this.pruebaForm.get('pruebaInput').disable();
    }
  }
}
