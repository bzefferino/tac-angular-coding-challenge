import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-person-modal',
  templateUrl: './addPersonModal.html',
  styleUrls: ['./addPersonModal.scss']
})
export class AddPersonModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddPersonModalComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}

// Opens an Error Modal to display an error
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
