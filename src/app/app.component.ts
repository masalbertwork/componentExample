import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myText: string = '';
  pruebaForm: FormGroup;
  disabledVar: boolean;

  constructor() {
    this.pruebaForm = new FormGroup({
      pruebaInput: new FormControl('Chao', [
        Validators.required,
        Validators.minLength(3)
      ])
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
