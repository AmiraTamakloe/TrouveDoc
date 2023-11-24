import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { MedecinComponent } from "../component/medecin/medecin.component";
import { MedecinFormCreationComponent } from "../component/medecin-form-creation/medecin-form-creation.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "medecin", component: MedecinComponent },
  { path: "create", component: MedecinFormCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
