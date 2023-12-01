import { Component, Inject, OnInit } from "@angular/core";
import { Service } from "../../../../../common/tables/Service";
import { Medecin } from "../../../../../common/tables/Medecin";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommunicationService } from "src/app/services/communication.service";
import { ConfirmationPopUpComponent } from "../confirmation-pop-up/confirmation-pop-up.component";

@Component({
  selector: "app-medecin-modification-form",
  templateUrl: "./medecin-modification-form.component.html",
  styleUrls: ["./medecin-modification-form.component.css"],
})
export class MedecinModificationFormComponent implements OnInit {
  medecinForm: FormGroup;
  services: Service[];

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConfirmationPopUpComponent>,
    private communicationService: CommunicationService,
    @Inject(MAT_DIALOG_DATA) public data: { medecin: Medecin }
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetchServices();
    this.initForm();
    this.medecinForm.get('specialite')?.valueChanges.subscribe((selectedSpecialite: string) => {
      const selectedService = this.services.find((service) => service.nomservice === selectedSpecialite);
      if (selectedService) {
        this.medecinForm.patchValue({
          idservice: selectedService.idservice,
          specialite: selectedService.nomservice,
        });
      }
    });
  }

  async fetchServices() {
    this.communicationService.getServices().subscribe((services: Service[]) => {
      this.services = services;
    });
  }

  cancelAction(): void {
    this.dialogRef.close();
  }

  initForm(): void {
    this.medecinForm = this.formBuilder.group({
      prenom: [this.data.medecin.prenom, Validators.required],
      nom: [this.data.medecin.nom, Validators.required],
      specialite: [this.data.medecin.specialite],
      anneesexperience: [
        +this.data.medecin.anneesexperience,
        Validators.required
      ],
      idservice: [this.data.medecin.idservice],
    });
  }

  onSubmit(): void {
    const regex = /^[a-zA-ZÀ-ÿ]+(?:-[a-zA-ZÀ-ÿ]+)?$/;
    if (!regex.test(this.medecinForm.controls["nom"].value)) {
      this.matSnackBar.open("Le nom ne doit pas contenir de chiffre ou de caractère spéciaux. Les noms de famille composé d'un seul trait d'union sont accepté", "x", {
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
    if (
      this.medecinForm.value.prenom === this.data.medecin.prenom &&
      this.medecinForm.value.nom === this.data.medecin.nom &&
      this.medecinForm.value.specialite === this.data.medecin.specialite &&
      this.medecinForm.value.anneesexperience ===
        this.data.medecin.anneesexperience &&
      this.medecinForm.value.idservice === this.data.medecin.idservice
    ) {
      this.matSnackBar.open(
        "Aucun champ n'a été modifié. Veuillez modifier un champ!",
        "x",
        {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "center",
        }
      );
    } else {
      const medecinInfo = this.medecinForm.value as Medecin;
      medecinInfo.idmedecin = this.data.medecin.idmedecin;
      this.dialogRef.close(medecinInfo);
    }
  }
}
