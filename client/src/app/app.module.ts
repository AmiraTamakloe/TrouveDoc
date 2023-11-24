import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedecinComponent } from './component/medecin/medecin.component';
import { ConfirmationPopUpComponent } from './component/confirmation-pop-up/confirmation-pop-up.component';
import { MedecinFormCreationComponent } from './component/medecin-form-creation/medecin-form-creation.component';
import { MedecinModificationFormComponent } from './component/medecin-modification-form/medecin-modification-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MedecinComponent,
    ConfirmationPopUpComponent,
    MedecinFormCreationComponent,
    MedecinModificationFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
