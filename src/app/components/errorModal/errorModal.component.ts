import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  templateUrl: './errorModal.component.html',
  styleUrls: ['./errorModal.component.scss']
})
export class ErrorModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public errorMessage: string,
    public dialogRef: MatDialogRef<ErrorModalComponent>,
    //private router: Router
  ) { }

  close() {
    this.dialogRef.close();
  }
}

// Opens an Error Modal to display an error
@Injectable({ providedIn: 'root' })
export class ErrorModalHelper {

  constructor(private dialog: MatDialog) { }

  displayError(error: any) {

    // Would typically do checking for error status (401, etc.) and route to 
    // custom pages, but will skip for this demo because of time.
    // I would do that through an HTTP service or something that can catch 
    // and intercept the error

    let errorMessage: string = '';

    if (typeof error === 'string') {
      errorMessage = error;
    }
    else if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    }
    else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.height = '250px';
    dialogConfig.data = errorMessage;

    let dialogRef = this.dialog.open(ErrorModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        // Could potentially reroute here using router depending on another parameter.
      }
    );
  }
}
