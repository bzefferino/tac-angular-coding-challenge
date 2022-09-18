import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-person-modal',
  templateUrl: './addPersonModal.html',
  styleUrls: ['./addPersonModal.scss']
})
export class AddPersonModalComponent {

  constructor(public dialogRef: MatDialogRef<AddPersonModalComponent>) { }

  close() {
    this.dialogRef.close();
  }
}

// Opens an Error Modal to display an error. I like these helpers because it keeps your modal settings
// in one spot. I've had some intense forms in modals and the code can get long. Also doing it this way
// allows me to do things afterClosed() etc to the modal generally and can still return the dialogRef
// to the calling function if you needed.
@Injectable({ providedIn: 'root' })
export class AddPersonModalHelper {

  constructor(private dialog: MatDialog) { }

  show() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '595px';

    let dialogRef = this.dialog.open(AddPersonModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        // Could potentially reroute here using router depending on another parameter.
      }
    );
  }
}
