import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputControlComponent } from './input-control/input-control.component';
import { InputControlModule } from './input-control/input-control.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboControlComponent } from './combo-control/combo-control.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ComboEmpresaComponent } from './combo-empresa/combo-empresa.component';

@NgModule({
  declarations: [AppComponent, ComboControlComponent, ComboEmpresaComponent],
  imports: [
    BrowserModule,
    InputControlModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
