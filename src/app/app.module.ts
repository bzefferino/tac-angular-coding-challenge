import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PeopleComponent } from './pages/people/people';

// Instead of having the routes in a separate module,
// I added them here so that they are contained within the module they apply
// This is not how I'm used to having them, but since I was adding the routes
// to an existing project I figured it made sense to try it this way
const routes: Routes = [
  { path: '**', redirectTo: '/people' },
  { path: 'people', component: PeopleComponent },
  // { path: '', redirectTo: '/people', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
