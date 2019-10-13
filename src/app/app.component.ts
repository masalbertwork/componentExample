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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.pruebaForm = this.fb.group({
      pruebaInput: new FormControl('Chao', [
        Validators.required,
        Validators.minLength(3)
      ]),
      pruebaCombo: new FormControl(null, [Validators.required])
    });

    this.disabledVar = false;
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
