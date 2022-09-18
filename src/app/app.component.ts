import { Component, Injectable } from '@angular/core';

@Injectable()
export class Constants {
  public readonly API_ENDPOINT: string = ' https://www.userdomain.com/';
  public static TitleOfSite: string = " Making API calls the Right Way by Monica";
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tac-angular-coding-challenge';
  API_Endpoint = 'test'
}
