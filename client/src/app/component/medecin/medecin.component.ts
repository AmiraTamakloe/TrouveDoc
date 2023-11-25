import { Component, OnInit, ViewChild } from '@angular/core';
import { Medecin } from "../../../../../common/tables/Medecin";
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommunicationService } from 'src/app/services/communication.service';
import { ConfirmationPopUpComponent } from '../confirmation-pop-up/confirmation-pop-up.component';
import { MedecinModificationFormComponent } from '../medecin-modification-form/medecin-modification-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {

  displayedColumns: string[] = ["prenom", "nom", "specialite", "anneesExperience", "service", "actions"];
  medecins: MatTableDataSource<Medecin>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private communicationService: CommunicationService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.medecins.paginator = this.paginator;
  }

  
  async ngOnInit(): Promise<void> {
    // await this.fetchData();

    const data = [{
      "idmedecin": 1,
      "prenom": "Marie",
      "nom": "Rousseau",
      "specialite": "Dermatologie",
      "anneesexperience": 8,
      "idservice": 3
  }, {
      "idmedecin": 2,
      "prenom": "Philippe",
      "nom": "Lemelin",
      "specialite": "Neurologie",
      "anneesexperience": 6,
      "idservice": 4
  }, {
      "idmedecin": 3,
      "prenom": "Valérie",
      "nom": "Bélanger",
      "specialite": "Ophtalmologie",
      "anneesexperience": 10,
      "idservice": 1
  }, {
      "idmedecin": 4,
      "prenom": "Alex",
      "nom": "Michaud",
      "specialite": "Orthopédie",
      "anneesexperience": 12,
      "idservice": 2
  }, {
      "idmedecin": 5,
      "prenom": "Nathalie",
      "nom": "Gagné",
      "specialite": "Psychiatrie",
      "anneesexperience": 9,
      "idservice": 3
  }, {
      "idmedecin": 6,
      "prenom": "Simon",
      "nom": "Tremblay",
      "specialite": "Cardiologie",
      "anneesexperience": 15,
      "idservice": 4
  }, {
      "idmedecin": 7,
      "prenom": "Audrey",
      "nom": "Beaulieu",
      "specialite": "Pédiatrie",
      "anneesexperience": 7,
      "idservice": 1
  }, {
      "idmedecin": 8,
      "prenom": "David",
      "nom": "Fournier",
      "specialite": "Chirurgie",
      "anneesexperience": 11,
      "idservice": 2
  }, {
      "idmedecin": 9,
      "prenom": "Isabelle",
      "nom": "Lapointe",
      "specialite": "Gynécologie",
      "anneesexperience": 14,
      "idservice": 3
  }, {
      "idmedecin": 10,
      "prenom": "François",
      "nom": "Martel",
      "specialite": "Radiologie",
      "anneesexperience": 5,
      "idservice": 4
  }, {
      "idmedecin": 13,
      "prenom": "Amira",
      "nom": "Tamakloe",
      "specialite": "Cardiologie",
      "anneesexperience": 76,
      "idservice": 9
  }]
  
      this.medecins = new MatTableDataSource<Medecin>(data);
      this.medecins.paginator = this.paginator;
      this.paginator.pageSizeOptions = [5, 10, 20];
      this.paginator.showFirstLastButtons = true;
    
  }

  deleteHotel(idMedecin: string): void {
    const dialogRef = this.dialog.open(ConfirmationPopUpComponent, {
      height: '30%',
      width: '25%',
      data: { message: "Deleting is permanent! click confirm if you want to pursue this action " },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.communicationService
          .deleteMedecin(idMedecin)
          .subscribe(async (medecin: Medecin) => {
            if (medecin) {
              await this.fetchData();
            }
          });
      }
    });
  }

  editHotel(medecin: Medecin): void {
    const dialogRef = this.dialog.open(MedecinModificationFormComponent, {
      height: '80%',
      width: '25%',
      data: { medecin: medecin },
    });
    dialogRef.afterClosed().subscribe((result: Medecin) => {
      if (result) {
        this.communicationService
          .updateMedecin(result)
          .subscribe(async (medecin: Medecin) => {
            if (medecin) {
              await this.fetchData();
              this.matSnackBar.open("The values were correctly updated", "x", {
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "center",
              });
            } else {
              this.matSnackBar.open("An error occurred while modifying. The action was therefore canceled", "x", {
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "center",
              });
            }
          });
      }
    });
  }

  async fetchData() {
    this.communicationService.getMedecins().subscribe((medecins: Medecin[]) => {
      this.medecins = new MatTableDataSource<Medecin>(medecins);
      this.medecins.paginator = this.paginator;
      this.paginator.pageSizeOptions = [5, 10, 20];
      this.paginator.showFirstLastButtons = true;
    });
  }

}
