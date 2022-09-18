import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingOverlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
