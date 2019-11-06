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
  Self,
  Input
} from '@angular/core';
import {
  Observable,
  observable,
  of,
  Subject,
  fromEvent,
  forkJoin,
  BehaviorSubject
} from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import {
  mergeMap,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  zip,
  tap
} from 'rxjs/operators';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  FormControl
} from '@angular/forms';
import { AppActivitatService } from '../app.service';

@Component({
  selector: 'app-combo-control',
  templateUrl: './combo-control.component.html',
  styleUrls: ['./combo-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ComboControlComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComboControlComponent
  implements OnInit, ControlValueAccessor, DoCheck, Validator {
  selectedValue: string;
  selectedOption: any;
  typeaheadLoading: boolean;
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
  empresas: any;
  empresasFav: any;
  _favoritos: boolean;
  _maestros: boolean;
  _fields: any[];

  empresasObservable: Observable<any[]>;
  empresasObservable2: Observable<any[]>;
  empresasObservable3: Observable<any[]>;
  initial: any = null;
  initialMore: string = null;

  @Input('data')
  set data(value: Array<any>) {
    this.empresasFav = value;
  }

  @Input('favoritos')
  set favoritos(value: boolean) {
    this._favoritos = value;
  }

  @Input('maestro')
  set maestros(value: boolean) {
    this._maestros = value;
  }

  @Input('fields')
  set fields(value: Array<any>) {
    console.log('seteo fields' + value.length);
    this._fields = value;
  }

  noResult: boolean;
  isDisabled: boolean;
  emmitdelete: boolean;
  parseError: boolean;
  dataSource: Observable<any>;
  @Output() selectElement: EventEmitter<any>;
  @Output() noSelectElement: EventEmitter<any>;
  @Output() focusElement: EventEmitter<any>;
  @Output() deleteElement: EventEmitter<any>;
  @Output() validaElement: EventEmitter<any>;

  private contactSubject = new Subject<any>();
  contactsChange$ = this.contactSubject.asObservable();
  private contactsList = [];
  @ViewChild('inputFilter', { static: false }) inputFilter: ElementRef;
  apiResponse: any;
  isSearching: boolean;
  public myData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public currentData: Observable<any[]>;

  onChange = (_: any) => {};
  onTouch = () => {};

  constructor(
    private empresaAcitivitatService: AppActivitatService,
    private cd: ChangeDetectorRef // @Optional() @Self() public ngControl: NgControl
  ) {
    this.selectElement = new EventEmitter<any>();
    this.noSelectElement = new EventEmitter<any>();
    this.focusElement = new EventEmitter<any>();
    this.deleteElement = new EventEmitter<any>();
    this.validaElement = new EventEmitter<any>();

    this.isSearching = false;
    this.apiResponse = [{ name: 'HOLA', nif: '11232321K' }];

    this.currentData = this.myData.asObservable();

    this.currentData.subscribe(res => {
      this.apiResponse = res;
      console.log(res);
    });

    // this.dataSource = Observable.create((observer: any) => {
    //   // Runs on every search
    //   observer.next(this.selectedValue);
    // }).pipe(mergeMap((token: string) => this.getStatesAsObservable(token)));
  }

  ngOnInit() {
    this.emmitdelete = false;

    let first = of({ source: 1, value: 1 });
    const second: Observable<any[]> = of([
      {
        name: 'ALBERT MAS',
        nif: '34324344P'
      },
      {
        name: 'PERE MAS',
        nif: '34324344P'
      }
    ]);

    if (this._favoritos) {
      this.empresasObservable = Observable.create((observer: any) => {
        observer.next(this.initial);
      }).pipe(
        tap(x => console.log(x)),
        mergeMap((token: string) =>
          //const _token = token === null ? '' : token;
          this.getStatesAsObservableFav(token)
        )
      );
    } else {
      this.empresasObservable = Observable.create();
    }

    // this.empresasObservable2.subscribe(res => {
    //   console.log(`EMPRESA2->${JSON.stringify(res)}`);
    // });

    if (this._maestros) {
      this.empresasObservable2 = Observable.create((observer: any) => {
        observer.next(this.initialMore);
      }).pipe(
        mergeMap(
          (token: string) => this.getContacts(token)

          /* this.getContacts(token)*/
        )
      );
    } else {
      this.empresasObservable2 = Observable.create();
    }

    // if (this._maestros && this._favoritos) {
    //   forkJoin(this.empresasObservable, this.empresasObservable2).subscribe(
    //     res => {
    //       console.log('GOT:', res);
    //     }
    //   );
    // }
    if (this._maestros && this._favoritos) {
      this.empresasObservable3 = Observable.create((observer: any) => {
        observer.next(this.selectedValue);
      }).pipe(
        mergeMap((
          x // Aplanamos porque forkJoin devuelve un Observable de Observables
        ) => forkJoin(this.empresasObservable, this.empresasObservable2))
      );

      this.empresasObservable3.subscribe(res => {
        this.myData.next(res);
        console.log(res);
      });
    }

    // this.empresasObservable = Observable.create((observer: any) => {
    //   observer.next(this.selectedValue);
    // })
    //   .pipe(
    //     // get value
    //     map((event: any) => {
    //       return event.target.value;
    //     }),
    //     // if character length greater then 2
    //     filter((res: Array<any>) => res.length > 2),
    //     // Time in milliseconds between key events
    //     debounceTime(1000),
    //     // If previous query is diffent from current
    //     distinctUntilChanged()
    //   )
    //   .subscribe((text: string) => {
    //     this.isSearching = true;
    //     this.searchGetCall(text).subscribe(
    //       res => {
    //         console.log('res', res);
    //         this.isSearching = false;
    //         this.apiResponse = res;
    //       },
    //       err => {
    //         this.isSearching = false;
    //         console.log('error', err);
    //       }
    //     );
    //   });

    // fromEvent(this.inputFilter.nativeElement, 'keyup')
    //   .pipe(
    //     // get value
    //     map((event: any) => {
    //       return event.target.value;
    //     }),
    //     // if character length greater then 2
    //     filter(res => res.length > 2),
    //     // Time in milliseconds between key events
    //     debounceTime(1000),
    //     // If previous query is diffent from current
    //     distinctUntilChanged()
    //     // subscription for response
    //   )
    //   .subscribe((text: string) => {
    //     this.isSearching = true;
    //     this.searchGetCall(text).subscribe(
    //       res => {
    //         console.log('res', res);
    //         this.isSearching = false;
    //         this.apiResponse = res;
    //       },
    //       err => {
    //         this.isSearching = false;
    //         console.log('error', err);
    //       }
    //     );
    //   });
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.getContacts(term);
  }

  getStatesAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');

    return of(
      this.states.filter((state: any) => {
        return query.test(state.name);
      })
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.onChange(event.value);
    this.selectElement.emit(event);
    this.emmitdelete = false;
    this.parseError = false;
    this.cd.markForCheck();
  }

  typeaheadNoResults(event: boolean): void {
    // if (event && this.selectedValue.length >= 3) {
    this.noResult = event;
    this.noSelectElement.emit(null);
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

  public validate(c: FormControl) {
    return !this.parseError
      ? null
      : {
          jsonParseError: {
            valid: false
          }
        };
  }

  tocat(evt: Event) {
    this.initial = '';
    this.onTouch();
    this.focusElement.emit(this.selectedValue);
  }

  tecleig(evt) {
    if (evt.currentTarget.value.length > 2) {
      this.initialMore = '';
    }
  }

  canvi(evt) {
    console.log(`canvi:${evt.currentTarget.value}`);
    if (
      this.selectedOption &&
      evt.currentTarget.value === this.selectedOption.name
    ) {
      this.parseError = false;
      this.onChange(this.selectedValue);
    } else {
      this.parseError = true;
      this.selectedOption = null;
      this.selectedValue = null;
      this.onChange(null);
      this.validaElement.emit();
    }
  }

  ngDoCheck() {
    if (this.selectedValue === '') {
      if (!this.emmitdelete) {
        this.emmitdelete = true;
        this.deleteElement.emit({ event: 'deleteElement', object: null });
      }
    }
  }

  /* */
  getStatesAsObservableFav(token: string): Observable<any> {
    if (token === undefined || token === null) {
      token = '';
    }
    const arr = this.multiFilterExt(this.empresasFav, this._fields, token);
    this.myData.next(arr);
    return of(arr);
  }

  multiFilterExt(array: any[], filters, value) {
    console.log(filters.length);
    return array.filter(o =>
      filters.some(k => {
        if (o[k] !== undefined && o[k] !== null) {
          return o[k]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
      })
    );
  }

  getContacts(token: string): Observable<any> {
    const payload = { activity: 'TE' };
    if (token === undefined || token === null) {
      token = '';
    }
    return this.empresaAcitivitatService.consultaTransportistas(payload).pipe(
      map(data => {
        this.contactsList = this.multiFilterExt(data, this._fields, token);
        this.myData.next(this.contactsList);
        return this.contactsList;
      })
    );
  }

  addContact(item) {
    this.contactsList.push(item);
    this.contactSubject.next(this.contactsList);
  }
}
