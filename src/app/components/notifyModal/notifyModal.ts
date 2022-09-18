import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  templateUrl: './notifyModal.html',
  styleUrls: ['./notifyModal.scss']
})
export class NotifyModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string },
    public dialogRef: MatDialogRef<NotifyModalComponent>,
    //private router: Router
  ) { }

  public title: string = '';
  public message: string = '';

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  confirm(confirmed: boolean) {
    this.dialogRef.close(confirmed);
  }
}

// Opens an Notify Modal to display an notify
@Injectable({ providedIn: 'root' })
export class NotifyModalHelper {

  constructor(private dialog: MatDialog) { }

  confirm(title: string, message: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '380px';
    dialogConfig.height = '250px';
    dialogConfig.data = {
      title: title,
      message: message
    };

    return this.dialog.open(NotifyModalComponent, dialogConfig);


  }
}
