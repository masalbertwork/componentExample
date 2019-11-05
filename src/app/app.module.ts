import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputControlComponent } from './input-control/input-control.component';
import { InputControlModule } from './input-control/input-control.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboControlComponent } from './combo-control/combo-control.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ComboEmpresaComponent } from './combo-empresa/combo-empresa.component';
import { Combo1Component } from './combo1/combo1.component';
import { Combo2Component } from './combo2/combo2.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ComboControlComponent,
    ComboEmpresaComponent,
    Combo1Component,
    Combo2Component
  ],
  imports: [
    BrowserModule,
    InputControlModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
