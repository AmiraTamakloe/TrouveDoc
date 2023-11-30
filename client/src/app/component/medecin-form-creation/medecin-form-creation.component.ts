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
    specialite: [""],
    anneesexperience: ["", Validators.required],
    idservice: [""],
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
      this.medecinForm.controls.idservice.setValue(this.services[0].idservice);
      this.medecinForm.controls.specialite.setValue(this.services[0].nomservice);
    });
  }

  onSubmit(): void {
    if (this.medecinForm.valid) {
      const regex = /^[a-zA-ZÀ-ÿ]+(?:-[a-zA-ZÀ-ÿ]+)?$/;
      if (!regex.test(this.medecinForm.controls["nom"].value)) {
        this.matSnackBar.open("Le nom ne doit pas contenir de chiffre ou de caractère spéciaux", "x", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
        });
        return;
      }
      if (!regex.test(this.medecinForm.controls["prenom"].value)) {
        this.matSnackBar.open("Le prénom ne doit pas contenir de chiffre ou de caractère spéciaux. Les noms composés avec un seul trait d'union sont accepté", "x", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
        });
        return;
      }
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
