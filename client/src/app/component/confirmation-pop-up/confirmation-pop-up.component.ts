import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirmation-pop-up",
  templateUrl: "./confirmation-pop-up.component.html",
  styleUrls: ["./confirmation-pop-up.component.css"],
})
export class ConfirmationPopUpComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  cancelAction(): void {
    this.dialogRef.close();
  }
}
