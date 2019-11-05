import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Optional,
  Self,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NgControl
} from '@angular/forms';
import { AppActivitatService } from '../app.service';
import { FavoritoPayload } from '../model/FavoritoPayload';

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
  favoritos: any[];
  _nif: string; //sessionNif: "B58368069";
  _token: string;
  _pais: string;
  _fields: string[] = ['name', 'nif'];

  @Input('token')
  set token(value: string) {
    console.log('find fav seteo fields' + value);
    this._token = value;
    this.empresaAcitivitatService.token = this._token;
  }
  @Input('nif')
  set nif(value: string) {
    this._nif = value;
  }
  @Input('pais')
  set pais(value: string) {
    console.log('seteo fields' + value);
    this._pais = value;
  }

  onChange = (_: any) => {};
  onTouch = () => {};

  constructor(
    private cd: ChangeDetectorRef,
    private empresaAcitivitatService: AppActivitatService,
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

  ngOnInit() {
    const payload: FavoritoPayload = new FavoritoPayload();
    payload.activity = 'ET';
    payload.sessionNif = this._nif;
    payload.sessionCountry = 'ES';
    this.empresaAcitivitatService
      .consultaTransportistasFavoritos(payload)
      .subscribe((x: any) => {
        this.favoritos = x;
        this.favoritos.map((y: any) => {
          y.name = y.name;
          y.fav = 'Favorito';
        });
        console.log(this.favoritos);
      });
  }

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
