import { Component, OnInit } from '@angular/core';
import { Service } from '../../../../../common/tables/Service';
import { Medecin } from '../../../../../common/tables/Medecin';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-medecin-form-creation',
  templateUrl: './medecin-form-creation.component.html',
  styleUrls: ['./medecin-form-creation.component.css']
})
export class MedecinFormCreationComponent implements OnInit {

  services: Service[];
  medecinForm = this.formBuilder.group({
    prenom: ["", Validators.required],
    nom: ["", Validators.required],
    specialite: ["", Validators.required],
    anneesexperience: ["", Validators.required],
    idservice: ["", Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private communicationService: CommunicationService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData() {
    this.communicationService.getServices().subscribe((services: Service[]) => {
      this.services = services;
      console.log(this.services);
      this.medecinForm.controls.idservice.setValue(this.services[0].idservice);
      this.medecinForm.controls.specialite.setValue(this.services[0].nomservice);
    });
  }

  onSubmit(): void {
    if (this.medecinForm.valid) {
      if (this.medecinForm.controls["anneesexperience"].invalid || this.medecinForm.controls["anneesexperience"].value <= 0 || this.medecinForm.controls["anneesexperience"].value > 100) {
        this.matSnackBar.open("Les années d'expériences doivent être un chiffre positif n'excédant pas 100", "x", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
        });
        return;
      }
      const medecinInfo = this.medecinForm.value as Medecin;
      this.communicationService.addMedecin(medecinInfo).subscribe((medecin: Medecin) => {
        if (medecin) {
          this.matSnackBar.open("Le médecin a été rajouté avec succès", "x", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center",
          });
          this.router.navigate(["/medecin"]);
        } else {
          this.matSnackBar.open("Une erreur s'est produite lors de la sauvegarde dans la base de donnée. Veuillez réessayer!.", "x", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
          });
          this.medecinForm.reset();
        }
      });
    }
  }
}